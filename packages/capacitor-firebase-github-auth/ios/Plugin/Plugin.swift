/* swiftlint:disable force_unwrapping */
import Foundation
import Capacitor
import FirebaseCore
import FirebaseAuth

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(GitHubFirebaseAuth)
public class GitHubFirebaseAuth: CAPPlugin {
    var provider: OAuthProvider?

    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.success([
            "value": value
        ])
    }

    @objc override public func load() {
        print("GitHubFirebaseAuth: Initialized")
        if FirebaseApp.app() == nil {
            FirebaseApp.configure()
        }
    }

    @objc func signIn(_ call: CAPPluginCall) {
        provider = OAuthProvider(providerID: "github.com")
        provider?.getCredentialWith(nil) { credential, error in
            if error != nil {
                self.handleError(call, message: error?.localizedDescription ?? "")
                return
            }
            if credential != nil {
                Auth.auth().signIn(with: credential!) { authResult, error in
                    if error != nil {
                        self.handleError(call, message: error?.localizedDescription ?? "")
                        return
                    }
                    guard let oauthCredential = authResult?.credential as? OAuthCredential else { return }
                    self.handleSuccess(call, oauthCredential: oauthCredential)
                }
            }
        }
    }

    @objc func signOut(_ call: CAPPluginCall) {
        do {
            try Auth.auth().signOut()
        } catch let signOutError as NSError {
            print("Error signing out: %@", signOutError)
        }

    }

    func handleError(_ call: CAPPluginCall, message: String) {
        print(message)
        call.reject(message)
    }

    func handleSuccess(_ call: CAPPluginCall, oauthCredential: OAuthCredential) {
        print("GitHubFirebaseAuth: successfully signIn")
        // GitHub OAuth access token can also be retrieved by:
        // oauthCredential.accessToken
        // GitHub OAuth ID token can be retrieved by calling:
        // oauthCredential.idToken
        let result: PluginResultData = [
            "accessToken": oauthCredential.accessToken ?? ""
        ]
        call.success(result)
    }
}
