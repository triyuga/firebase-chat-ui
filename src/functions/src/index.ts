import { Response } from 'firebase-functions/v1'
import { Request, onRequest } from 'firebase-functions/v2/https'
import * as logger from 'firebase-functions/logger'
// import { initializeApp } from 'firebase-admin/app'
import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import { getFirestore } from 'firebase-admin/firestore'

// const app = initializeApp()
// const functions = getFunctions(app);


// Start writing functions: https://firebase.google.com/docs/functions/typescript
export const helloWorld = onRequest((request: Request, response: Response) => {
    logger.info('Hello logs!', { structuredData: true })
    console.log('request', request)
    response.send('Hello from Firebase!')
})

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
export const addMessage = onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text
    // Push the new message into Firestore using the Firebase Admin SDK.
    const writeResult = await getFirestore().collection('messages').add({ original: original })
    // Send back a message that we've successfully written the message
    res.json({ result: `Message with ID: ${writeResult.id} added.` })
})

// sendMessage: http://127.0.0.1:5001/fir-rpg-chat/us-central1/sendMessage
// export const sendMessage = onRequest(async (req: Request, res) => {
//     // Grab the text parameter.
//     const text = req.query.text ? req.query.text as string : ''
//     // Push the new message into Firestore using the Firebase Admin SDK.
//     const uid = req.auth.uid;
//     getAuth()
//         .getUser(uid)
//         .then((userRecord) => {
//             // See the UserRecord reference doc for the contents of userRecord.
//             console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
//         })
//         .catch((error) => {
//             console.log('Error fetching user data:', error);
//         });

// .then(function (token) {
//     // You got the user token
// })

//     const message: NewMessage = {
//         text,
//         createdAt: new Date(),
//         uid: this.user.uid,
//         photoURL: this.user.photoURL || undefined
//     }

//     const writeResult = await getFirestore().collection('messages').add({ text })
//     // Send back a message that we've successfully written the message
//     res.json({ result: `Message with ID: ${writeResult.id} added.` })

//     try {

//         const docRef = await addDoc(collection(this.db, 'messages'), message)
//         console.log('Document written with ID: ', docRef.id)
//     } catch (e) {
//         console.error('Error adding document: ', e)
//     }
// })

// Listens for new messages added to /messages/:documentId/original
// and saves an uppercased version of the message
// to /messages/:documentId/uppercase
export const makeUppercase = onDocumentCreated('/messages/{documentId}', event => {
    // Grab the current value of what was written to Firestore.
    const original = event.data?.data().text

    // Access the parameter `{documentId}` with `event.params`
    logger.log('makeUppercase', event.params.documentId, original)

    const uppercaseText = original.toUpperCase()

    // Setting an 'uppercase' field in Firestore document returns a Promise.
    return event.data?.ref.set({ uppercaseText }, { merge: true })
})
