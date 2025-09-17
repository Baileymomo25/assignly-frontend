import { useState } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';

export function useFirebase() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadFile = async (file) => {
    try {
      const storageRef = ref(storage, `requests/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (err) {
      setError('File upload failed. Please try again.');
      throw err;
    }
  };

  const saveRequest = async (requestData) => {
    try {
      setLoading(true);
      setError(null);
      
      const docRef = await addDoc(collection(db, 'requests'), {
        ...requestData,
        createdAt: new Date(),
        status: 'pending',
        paid: false
      });
      
      return docRef.id;
    } catch (err) {
      setError('Failed to save request. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePaymentStatus = async (requestId, paymentData) => {
    try {
      setLoading(true);
      const requestRef = doc(db, 'requests', requestId);
      await updateDoc(requestRef, {
        paid: true,
        paymentData: paymentData,
        status: 'processing',
        paidAt: new Date()
      });
    } catch (err) {
      setError('Failed to update payment status.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    uploadFile,
    saveRequest,
    updatePaymentStatus
  };
}