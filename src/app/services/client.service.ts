import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { Firestore, deleteDoc, doc,limit,orderBy,startAfter , getDoc, getDocs, addDoc, setDoc, collection, query, getFirestore, DocumentData, documentId, where, Timestamp, and, or } from '@angular/fire/firestore';
import { convertToParamMap } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { firebaseConfig } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ClientService {

  constructor(public firestore: Firestore) { }

  async createClient(client: any, facture: any, entete: any): Promise<any> {
    client['dateCreation'] = new Date();
    this.getCaisseData().then((data) => {
      setDoc(doc(this.firestore, "client", (data.lastFactureId + 1).toString()), client);//create client
      setDoc(doc(this.firestore, "facture", (data.lastFactureId + 1).toString()), facture);//create facture
      setDoc(doc(this.firestore, "entete", "1"), entete);//create entete
      setDoc(doc(this.firestore, "general", "1"), {... data ,  caisse: data.caisse + parseInt(client["NetPayer"]), lastFactureId: data.lastFactureId + 1, numberFacture: data.numberFacture + 1 })//update factureId
      return true
    }).catch((error) => {
      confirm("la facture na pas ete cree il peut quelle existe deja")

      return false
    })
    return true

  }

  async readClients(skip:number,maxResultCount:number): Promise<any[]> {
    let object: any[] = [];
    (await getDocs(query(collection(this.firestore, 'client')))).docs.map((robots) => {
      object.push(robots.data())
    })
    return object;
  }


  async readClientsPaged(startAfterDoc: number,maxResult:number,filterNumero?:string,filterDate?:string): Promise<any[]> {
    const object: any[] = [];
    var id:any=0;
    if((filterNumero!=undefined)&&(filterDate!=undefined)){
      var queryRef = query(collection(this.firestore, 'client'),or( where("dateCreation", ">=", new Date(filterDate)),where(documentId(), ">=", filterNumero) ));

    }
    else if(filterNumero!=undefined)var queryRef = query(collection(this.firestore, 'client'),orderBy(documentId()), where(documentId(), ">=", filterNumero));
    else if(filterDate!=undefined)var queryRef = query(collection(this.firestore, 'client'),orderBy("dateCreation"), where("dateCreation", ">=", new Date(filterDate)));
    else var queryRef = query(collection(this.firestore, 'client'),orderBy(documentId()),startAfter(startAfterDoc+''), limit(maxResult));
    var querySnapshot = await getDocs(queryRef)
    
     querySnapshot.docs.map((robots) => {
       id=robots.id
       object.push(robots.data())

     })
     object.push(id)

    return object;
  }
  
  async readBons(): Promise<any[]> {
    let object: any[] = [];
    (await getDocs(query(collection(this.firestore, 'bons')))).docs.map((robots) => {
      object.push(robots.data())
    })
    return object;
  }

  async readBonsPaged(startAfterDoc: number,maxResult:number): Promise<any[]> {
    const object: any[] = [];
    var id:any=0;
    var queryRef = query(collection(this.firestore, 'bons'),orderBy(documentId()),startAfter(startAfterDoc+''), limit(maxResult));
    var querySnapshot = await getDocs(queryRef)
    
     querySnapshot.docs.map((robots) => {
       id=robots.id
       object.push(robots.data())
     })
     object.push(id)
    return object;
  }

  async readClient(id: string): Promise<{client:any, facture:any, entete:any}> {
    var clientRef = doc(this.firestore, "client", id);
    const client = await getDoc(clientRef)
    var clientData = await client.data();

    var factureRef = doc(this.firestore, "facture", id);
    var facture = await getDoc(factureRef) 
    var factureData = await facture.data();

    var enteteRef = doc(this.firestore, "entete", "1");
    var entete = await getDoc(enteteRef) 
    var enteteData = await entete.data();
    return { client: clientData, facture: factureData, entete: enteteData }

  }
  async deleteFacture(id: string, somme: number): Promise<any> {
    try {
      await deleteDoc(doc(this.firestore, "client", id));
      await deleteDoc(doc(this.firestore, "facture", id));
      this.getCaisseData().then((data) => {
        setDoc(doc(this.firestore, "general", "1"), {...data, caisse: data.caisse - somme, lastFactureId: data.lastFactureId, numberFacture: data.numberFacture - 1 })
      })

    } catch (error) {
      return false
    }
    return true
  }
 async deleteBon(id:string, somme:number){
  try {
    console.log(id)
    console.log(typeof(id))
    await deleteDoc(doc(this.firestore, "bons", id+''));
    this.getCaisseData().then((data) => {
      setDoc(doc(this.firestore, "general", "1"), {...data, caisse: data.caisse + somme, numberBons: data.numberBons - 1 })
    })

  } catch (error) {
    confirm("le Bons n'est pas supprimer ")
  }
  return true
  }

  async readBon(id: string): Promise<{bon:any}>{
    console.log(id)
    var bonsRef = doc(this.firestore, "bons", id);
    const bons = await getDoc(bonsRef)
    var bonsData = await bons.data();
    return { bon:bonsData  }
  }

  async getCaisseData(): Promise<general> {
    const docRef = doc(this.firestore, "general", "1");
    const docSnap = await getDoc(docRef)
    return docSnap.data() as general
  }


  async getTitleData(id:string): Promise<any> {
    const docRef = doc(this.firestore, "entete",id);
    const docSnap = await getDoc(docRef)
    return docSnap.data() 
  }
  
  async createBons(bons:any){
    this.getCaisseData().then((data) => {
      bons.id=data.lastBonsId+1// ajouter a notre objet une champe pour declare  la variable exiasnece 
      setDoc(doc(this.firestore, "bons", bons.id+''), bons);//create entete
      setDoc(doc(this.firestore, "general", "1"), {... data, caisse: data.caisse - parseInt(bons.total+''),  lastBonsId: data.lastBonsId + 1, numberBons: data.numberBons + 1  })//update factureId
      return true
    }).catch((error) => {
      confirm("la facture na pas ete cree il peut quelle existe deja")

      return false
    })
    return true

  }
}






export interface general {
  caisse: number,
  lastFactureId: number,
  lastBonsId: number,
  numberFacture: number,
  numberBons: number
}

// export interface client{
//   Name:string,
//   FactureN:string,
//   FactureId:number,
//   Adresse:string,
//   Origine:string,
//   Nature_de_Marchandise:string
// }
