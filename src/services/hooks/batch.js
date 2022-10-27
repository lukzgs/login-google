import { useContext } from "react";
import { Context } from "../../context/context";
import { firestore } from "../firebase";

const useBatch = async (e) => {
  const { user } = useContext(Context);

  e.preventDefault();
  const userRef = firestore.doc(`users/${user.uid}`);

  const batch = firestore.batch();
  batch.set(userRef, { 
    photoURL: user.photoURL,
    displayName: user.displayName,
    createdAt: Date.now(),
  });

  await batch.commit();
}