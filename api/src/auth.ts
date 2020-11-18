import { NextFunction, Request, Response } from 'express';
import firebase from 'firebase-admin';

export function initFirebase() {
  firebase.initializeApp({ credential: firebase.credential.applicationDefault() });
}

export async function requireAuth(req: Request, _res: Response, next: NextFunction) {
  if (!req.headers.authorization) {
    throw new Error('The Authorization header must be set.');
  }

  const authHeader = req.headers.authorization.split('Bearer ');
  if (authHeader.length < 2) {
    throw new Error(
      "The Authorization header must be formatted as 'Bearer <token>' where <token> is a valid auth key."
    );
  }

  const authToken = authHeader[1];
  let user;
  try {
    user = await firebase.auth().verifyIdToken(authToken);
  } catch (err) {
    throw new Error(err.errorInfo.message);
  }

  if (!user) {
    throw new Error();
  }

  req.userId = user.uid;
  next();
}

export async function addOrganizationClaim(userId: string, organizationId: string) {
  await firebase.auth().setCustomUserClaims(userId, { organizationId });
}
