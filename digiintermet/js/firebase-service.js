import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    orderBy,
    query,
    serverTimestamp,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";
import { firebaseConfig, isFirebaseConfigured } from "./firebase-config.js";

let appInstance = null;
let authInstance = null;
let dbInstance = null;

function ensureFirebase() {
    if (!isFirebaseConfigured()) {
        return null;
    }

    if (!appInstance) {
        appInstance = initializeApp(firebaseConfig);
        authInstance = getAuth(appInstance);
        dbInstance = getFirestore(appInstance);
    }

    return {
        app: appInstance,
        auth: authInstance,
        db: dbInstance
    };
}

export function getFirebaseState() {
    const services = ensureFirebase();
    return {
        configured: Boolean(services),
        ...services
    };
}

export async function findCoverageByCep(cepDigits) {
    const services = ensureFirebase();
    if (!services) {
        throw new Error("firebase-not-configured");
    }

    const coverageRef = doc(services.db, "coverage", cepDigits);
    const snapshot = await getDoc(coverageRef);

    if (!snapshot.exists()) {
        return null;
    }

    return {
        id: snapshot.id,
        ...snapshot.data()
    };
}

export async function saveCoverage(payload) {
    const services = ensureFirebase();
    if (!services) {
        throw new Error("firebase-not-configured");
    }

    await setDoc(doc(services.db, "coverage", payload.cep), {
        cep: payload.cep,
        street: payload.street,
        neighborhood: payload.neighborhood,
        city: payload.city,
        plans: payload.plans,
        updatedAt: serverTimestamp()
    }, { merge: true });
}

export async function listCoverage() {
    const services = ensureFirebase();
    if (!services) {
        throw new Error("firebase-not-configured");
    }

    const coverageQuery = query(collection(services.db, "coverage"), orderBy("street"));
    const snapshot = await getDocs(coverageQuery);

    return snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data()
    }));
}

export async function getPopupSettings() {
    const services = ensureFirebase();
    if (!services) {
        throw new Error("firebase-not-configured");
    }

    const popupRef = doc(services.db, "siteSettings", "popupCampaign");
    const snapshot = await getDoc(popupRef);

    if (!snapshot.exists()) {
        return null;
    }

    return {
        id: snapshot.id,
        ...snapshot.data()
    };
}

export async function savePopupSettings(payload) {
    const services = ensureFirebase();
    if (!services) {
        throw new Error("firebase-not-configured");
    }

    await setDoc(doc(services.db, "siteSettings", "popupCampaign"), {
        ...payload,
        updatedAt: serverTimestamp()
    }, { merge: true });
}

export async function getExitSettings() {
    const services = ensureFirebase();
    if (!services) {
        throw new Error("firebase-not-configured");
    }

    const exitRef = doc(services.db, "siteSettings", "exitIntent");
    const snapshot = await getDoc(exitRef);

    if (!snapshot.exists()) {
        return null;
    }

    return {
        id: snapshot.id,
        ...snapshot.data()
    };
}

export async function saveExitSettings(payload) {
    const services = ensureFirebase();
    if (!services) {
        throw new Error("firebase-not-configured");
    }

    await setDoc(doc(services.db, "siteSettings", "exitIntent"), {
        ...payload,
        updatedAt: serverTimestamp()
    }, { merge: true });
}

export async function loginAdmin(email, password) {
    const services = ensureFirebase();
    if (!services) {
        throw new Error("firebase-not-configured");
    }

    return signInWithEmailAndPassword(services.auth, email, password);
}

export async function logoutAdmin() {
    const services = ensureFirebase();
    if (!services) {
        throw new Error("firebase-not-configured");
    }

    return signOut(services.auth);
}

export function observeAdminSession(callback) {
    const services = ensureFirebase();
    if (!services) {
        callback(null);
        return () => {};
    }

    return onAuthStateChanged(services.auth, callback);
}
