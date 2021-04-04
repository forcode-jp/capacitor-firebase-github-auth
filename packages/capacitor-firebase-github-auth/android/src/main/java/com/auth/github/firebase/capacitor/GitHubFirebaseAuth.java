package com.auth.github.firebase.capacitor;

import android.util.Log;
import androidx.annotation.NonNull;
import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthCredential;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.OAuthCredential;
import com.google.firebase.auth.OAuthProvider;

@NativePlugin
public class GitHubFirebaseAuth extends Plugin implements OnSuccessListener<AuthResult>, OnFailureListener {

    private static final String TAG = "GitHubFirebaseAuth";

    private FirebaseAuth firebaseAuth;
    private OAuthProvider.Builder provider;
    private AuthCredential authCredential;

    public void load() {
        Log.i(TAG, "initialized");
        this.firebaseAuth = FirebaseAuth.getInstance();
        this.provider = OAuthProvider.newBuilder("github.com");
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
        this.saveCall(call);

        Task<AuthResult> pendingResultTask = firebaseAuth.getPendingAuthResult();
        if (pendingResultTask != null) {
            // There's something already here! Finish the sign-in for your user.
            pendingResultTask.addOnSuccessListener(this).addOnFailureListener(this);
        } else {
            // There's no pending result so you need to start the sign-in flow.
            // See below.
            firebaseAuth
                .startActivityForSignInWithProvider(/* activity= */this.bridge.getActivity(), provider.build())
                .addOnSuccessListener(this)
                .addOnFailureListener(this);
        }
    }

    @PluginMethod
    public void signOut(PluginCall call) {
        this.firebaseAuth.getInstance().signOut();
    }

    @Override
    public void onFailure(@NonNull Exception e) {
        Log.w(TAG, e);
        PluginCall call = getSavedCall();

        call.reject(e.getLocalizedMessage());
    }

    @Override
    public void onSuccess(AuthResult authResult) {
        Log.i(TAG, "successfully signIn");
        PluginCall call = getSavedCall();

        JSObject result = new JSObject();
        OAuthCredential authCredential = (OAuthCredential) authResult.getCredential();
        result.put("accessToken", authCredential.getAccessToken());

        call.success(result);
    }
}
