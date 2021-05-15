import { WebPlugin } from '@capacitor/core';
import { GitHubFirebaseAuthPlugin, SignInResult } from './definitions';
import firebase from 'firebase/app';

import { registerWebPlugin } from '@capacitor/core';

type OAuthCredential = firebase.auth.OAuthCredential;

export class GitHubFirebaseAuthWeb
  extends WebPlugin
  implements GitHubFirebaseAuthPlugin
{
  constructor() {
    super({
      name: 'GitHubFirebaseAuth',
      platforms: ['web'],
    });
  }

  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }

  // https://firebase.google.com/docs/auth/web/github-auth
  async signIn(): Promise<SignInResult> {
    const provider = new firebase.auth.GithubAuthProvider();
    const userCredential = await firebase.auth().signInWithPopup(provider);
    const {
      credential: { accessToken },
    } = userCredential as { credential: OAuthCredential };

    return { accessToken };
  }

  signOut() {
    return firebase.auth().signOut();
  }
}

const GitHubFirebaseAuth = new GitHubFirebaseAuthWeb();

export { GitHubFirebaseAuth };
registerWebPlugin(GitHubFirebaseAuth);
