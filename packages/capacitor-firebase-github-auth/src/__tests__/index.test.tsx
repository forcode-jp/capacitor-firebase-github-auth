import { fireEvent, render, screen } from '@testing-library/react';
import firebase from 'firebase/app';
import { signInWithGitHubProvider, signOut } from '../index';
import { IonButton, IonCard, IonCardHeader, IonItem } from '@ionic/react';
import { useState } from 'react';
import { act } from 'react-dom/test-utils';

type OAuthCredential = firebase.auth.OAuthCredential;
type SignInWithPopup = ReturnType<typeof firebase.auth>['signInWithPopup'];
type SignInWithCredential = ReturnType<
  typeof firebase.auth
>['signInWithCredential'];
type Credential = typeof firebase.auth.GithubAuthProvider.credential;
const originalProvider = firebase.auth.GithubAuthProvider;

const TestComponent = () => {
  const [user, setUser] = useState<firebase.User | null>(null);

  const handleLoginClick = async () => {
    try {
      const userCredential = await signInWithGitHubProvider(firebase.auth());
      if (userCredential?.user) {
        setUser(userCredential.user);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSignOut = () => signOut(firebase.auth());

  return (
    <IonCard>
      {user && <IonCardHeader>Logged in as {user?.displayName}</IonCardHeader>}
      <IonItem>
        {user ? (
          <IonButton data-testId="logout" onClick={handleSignOut}>
            Logout
          </IonButton>
        ) : (
          <IonButton data-testId="login" onClick={handleLoginClick}>
            GitHub Login
          </IonButton>
        )}
      </IonItem>
    </IonCard>
  );
};

describe('Web Test', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders login button', async () => {
    const signInWithPopup: SignInWithPopup = jest
      .fn()
      .mockResolvedValue({ credential: { accessToken: 'Access Token' } });
    const signInWithCredential: SignInWithCredential = jest
      .fn()
      .mockResolvedValue({ user: { displayName: 'Test User' } });
    const credential: Credential = jest
      .fn()
      .mockReturnValue({ idToken: 'idToken' });
    // @ts-ignore
    jest.spyOn(firebase, 'auth').mockImplementation(() => ({
      signInWithPopup,
      signInWithCredential,
    }));
    firebase.auth.GithubAuthProvider = originalProvider;
    firebase.auth.GithubAuthProvider.credential = credential;

    const { baseElement } = render(<TestComponent />);
    expect(baseElement).toBeDefined();

    const button = screen.getByText('GitHub Login');
    await act(async () => {
      await fireEvent.click(button);
      await screen.findByText('Logged in as Test User');
    });
    const providerInstance = new firebase.auth.GithubAuthProvider();
    expect(signInWithPopup).toBeCalledWith(providerInstance);
    const userCredential = await signInWithPopup(providerInstance);
    const {
      credential: { accessToken },
    } = userCredential as { credential: OAuthCredential };

    expect(credential).toBeCalledWith(accessToken);
    expect(signInWithCredential).toBeCalledWith(credential(accessToken!));
  });
});
