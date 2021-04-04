import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './Home.css';
import firebase from 'firebase';
import { signInWithGitHubProvider } from 'capacitor-firebase-github-auth';
import { useEffect, useState } from 'react';

const Home: React.FC = () => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLoginClick = () => {
    signInWithGitHubProvider(firebase.auth());
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        {user?.displayName}

        <IonButton onClick={handleLoginClick}>GitHub Login</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
