import { Capacitor, Plugins, registerWebPlugin } from '@capacitor/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import { GitHubFirebaseAuth } from './web';
import pkg from '../package.json';

const plugin = Plugins.GitHubFirebaseAuth;

if (Capacitor.platform === 'web') {
  registerWebPlugin(GitHubFirebaseAuth);
}

export const version = pkg.version;

export const signInWithGitHubProvider = async (Auth: firebase.auth.Auth) => {
  try {
    const { accessToken } = await plugin.signIn();
    if (!accessToken) {
      throw new Error('Access Token not found');
    }
    const credential = firebase.auth.GithubAuthProvider.credential(accessToken);
    return Auth.signInWithCredential(credential);
  } catch (err) {
    console.error(err);
  }
};

export const signOut = async (Auth: firebase.auth.Auth) => {
  await Auth.signOut();
  return plugin.signOut();
};
