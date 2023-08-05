import { app as firebase } from "./getApp";

import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  WhereFilterOp,
  FieldPath,
  getDoc,
} from "firebase/firestore";

import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  signOut,
} from "firebase/auth";

import { getStorage } from "firebase/storage";

const addDocument = async (req: { collection: string; data: any }) => {
  const db = getFirestore(firebase);
  //console.log(req);

  const response = await addDoc(collection(db, req.collection), req.data)
    .then(async (snapshot) => {
      return await updateDocument({
        collection: req.collection,
        document: snapshot.id,
        data: { id: snapshot.id },
      });
    })
    .catch((error) => {
      return {
        status: 500,
        message: "error",
      };
    });
  return response;
};

const addDocumentwithID = async (req: {
  collection: string;
  data: any;
  document: string;
}) => {
  const db = getFirestore(firebase);
  //console.log(req);

  const response = await setDoc(doc(db, req.collection, req.document), req.data)
    .then(() => {
      return {
        status: 200,
        message: "updated successfully",
      };
    })
    .catch((error) => {
      return {
        status: 200,
        message: "error",
      };
    });
  return response;
};

const updateDocument = async (req: {
  collection: string;
  document: string;
  data: any;
}) => {
  const db = getFirestore(firebase);

  const docRef = doc(db, req.collection, req.document);
  // console.log(req)

  const response = await updateDoc(docRef, req.data)
    .then(() => {
      // console.log("status", status);
      return {
        status: 200,
        message: "updated successfully",
      };
    })
    .catch(() => {
      return {
        status: 500,
        message: "error",
      };
    });

  return response;
};

const deleteDocument = async (req: {
  collection: string;
  document: string;
}) => {
  const db = getFirestore(firebase);

  const docRef = doc(db, req.collection, req.document);
  const response = await deleteDoc(docRef)
    .then(() => {
      // console.log("status", status);
      return {
        status: 200,
        message: "deleted successfully",
      };
    })
    .catch(() => {
      return {
        status: 500,
        message: "error",
      };
    });

  return response;
};

const getCollection = async (req: { collection: string }) => {
  const db = getFirestore(firebase);
  console.log(req.collection);
  const response = await getDocs(collection(db, req.collection))
    .then((res) => {
      // console.log("status", status);
      return <
        {
          status: number;
          data: any[] | string;
        }
      >{
        status: 200,
        data: res.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        }),
      };
    })
    .catch((error) => {
      return <
        {
          status: number;
          data: any[] | string;
        }
      >{
        status: 500,
        data: error,
      };
    });
  // console.log(response)
  return response;
};

const getFilteredCollection = async (req: {
  collection: string;
  operation: {
    parameter: string;
    operator: WhereFilterOp;
    value: string; // value to compare
  };
}) => {
  const db = getFirestore(firebase);

  const q = query(
    collection(db, req.collection),
    where(req.operation.parameter, req.operation.operator, req.operation.value)
  );

  const response = await getDocs(q)
    .then((res) => {
      // console.log("status", status);
      return {
        status: 200,
        data: res.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        }),
      };
    })
    .catch((error) => {
      return {
        status: 500,
        message: error,
      };
    });
  return response;
};

const getDocument = async (req: { collection: string; document: string }) => {
  const db = getFirestore(firebase);

  const response = await getDoc(doc(db, req.collection, req.document))
    .then((res) => {
      // console.log("status", status);
      return {
        status: 200,
        data: res.data(),
      };
    })
    .catch((error) => {
      return {
        status: 500,
        message: error,
      };
    });
  return response;
};

const login = async (req: { pin: number }) => {
  const auth = getAuth(firebase);

  console.log("real pin", process.env.PIN);
  console.log("given Pin", req.pin);
  if (String(req.pin) === process.env.PIN) {
    const response = await setPersistence(auth, browserSessionPersistence)
      .then(async () => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        console.log("usernsmae", process.env.FIREBASE_USERNAME);
        console.log("password", process.env.FIREBASE_PWD);
        const data = await signInWithEmailAndPassword(
          auth,
          process.env.FIREBASE_USERNAME!,
          process.env.FIREBASE_PWD!
        );

        // console.log("signin attempt", data);
        return {
          status: 200,
          data: data,
        };
      })
      .catch((error) => {
        // Handle Errors here.
        console.log("WHAT THE FUCK");
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("CODE", errorCode);
        console.log("ERROR:", errorMessage);
        return { status: 500, data: errorMessage };
      });

    return response;
  } else {
    return { status: 200, data: "Invalid Pin" };
  }
};

const logout = async () => {
  const auth = getAuth(firebase);

  const response = signOut(auth)
    .then(() => {
      console.log("signout function has been run");
      return { status: 200, data: "signed out" };
    })
    .catch((error) => {
      return { status: error.code, data: error.message };
    });

  return response;
};

const checkLoggedin = async () => {
  const auth = getAuth(firebase);

  const user = auth.currentUser;
  // console.log("user", user);

  if (user) {
    return { status: 200, data: true };
  } else {
    return { status: 200, data: false };
  }
};

export default {
  addDocument,
  updateDocument,
  deleteDocument,
  getCollection,
  getFilteredCollection,
  getDocument,
  addDocumentwithID,
  login,
  logout,
  checkLoggedin,
};
