import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonItem,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react"
import "./Home.css"
import firebase from "firebase/app"
import {
  signInWithGitHubProvider,
  signOut,
  version,
} from "capacitor-firebase-github-auth"
import { useEffect, useState } from "react"

const Home: React.FC = () => {
  const [user, setUser] = useState<firebase.User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
  }, [])

  const handleLoginClick = async () => {
    setIsLoading(true)
    try {
      await signInWithGitHubProvider(firebase.auth())
    } catch (e) {
      console.error(e)
    }
    setIsLoading(false)
  }

  const handleSignOut = () => signOut(firebase.auth())

  return (
    <IonPage>
      <IonLoading data-test-id="loading" isOpen={isLoading} />
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">v{version}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          {user && (
            <IonCardHeader id="card-header">
              Logged in as {user?.displayName}
            </IonCardHeader>
          )}
          <IonItem>
            {user ? (
              <IonButton id="logout-button" onClick={handleSignOut}>
                Logout
              </IonButton>
            ) : (
              <IonButton id="login-button" onClick={handleLoginClick}>
                GitHub Login
              </IonButton>
            )}
          </IonItem>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}

export default Home
