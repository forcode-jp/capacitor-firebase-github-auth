package com.auth.github.firebase.capacitor;

import android.util.Log;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

@NativePlugin
public class GitHubFirebaseAuth extends Plugin {

    public void load() {
        // Called when the plugin is first constructed in the bridge
        Log.d("GitHubFirebaseAuth: Initialized");
    }

    @PluginMethod
    public void echo(PluginCall call) {
        String value = call.getString("value");

        JSObject ret = new JSObject();
        ret.put("value", value);
        call.success(ret);
    }

    @PluginMethod
    public void signIn(PluginCall call) {
        OAuthProvider.Builder provider = OAuthProvider.newBuilder("github.com");

        Task<AuthResult> pendingResultTask = firebaseAuth.getPendingAuthResult();
        if (pendingResultTask != null) {
            // There's something already here! Finish the sign-in for your user.
            pendingResultTask
                .addOnSuccessListener(this)
                .addOnFailureListener(this);
        } else {
            firebaseAuth
                .startActivityForSignInWithProvider(/* activity= */ this, provider.build())
                .addOnSuccessListener(this)
                .addOapnFailureListener(this);
        }
    }

    @PluginMethod
    public  void signOut(PluginCall call) {}

    @Override
    public void onSuccess(AuthResult authResult) {
        // Handle Success
    }

    @Override
    public void onFailure(@NonNull Exception e) {
        // Handle Failure
    }
}
