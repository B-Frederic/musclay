<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
// use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Hash;

use Validator;
use Socialite;

class UserController extends Controller
{
 /**
   * Create a new AuthController instance.
   *
   * @return void
   */
  public function __construct()
  {
    $this->middleware(['auth:api']);
  }
  /**
   * Update user Data (password / email / name)
   * 
   */
  public function userUpdate(Request $request)
  {

    $user = User::where('id', '=', auth()->user()->id)->first();

     // USER PICTURE CHANGE
     if ($request->picture !== null) {
      $isModified = true;
      $validator = Validator::make($request->all(), [
        'picture' => 'required|string',
      ]);
      if ($validator->fails()) {
        return response()->json($validator->error(), 422);
      }
      $user->picture = $request->picture;
      $user->save();
      return response()->json([
        'message' => 'User successfully updated',
        'user' => $user
      ], 200);
    }

    // For user update, we need that the password is the same as user's password
    $isPassAndEmailAreValid = Hash::check(request('password'), $user->password) && request('email') === $user->email;
    // If user is a googler user , we accept user modify his pseudo without password
    $isGoogleUser = $user->google_id;
    if (!isset($isGoogleUser)) {
      if(!$isPassAndEmailAreValid) {
        return response()->json(['Email et/ou Mot de passe incorrect'],401);
      }
    }
    $isModified = false;
      // PASSWORD CHANGE VALIDATION 
      if (request('newPassword') !== null) {
        $isModified = true;
        $validator = Validator::make($request->all(), [
          'newPassword' => 'required|confirmed|min:6',
          'newPassword_confirmation' => 'required|string|same:newPassword'
        ]);
        if ($validator->fails()) {
          return response()->json($validator->errors(), 422);
        }
        $user->password = Hash::make(request('newPassword'));
        $user->save();

        // return response()->json(['message' =>"Mot de passe incorrect"],422);
      }

      // PSEUDO CHANGE VALIDATION 
      if (request('name') !== $user->name) {
        $isModified = true;
        $validator = Validator::make($request->all(), [
          'name' => 'required|min:4'
        ]);
        if ($validator->fails()) {
          return response()->json($validator->error(), 422);
        }
        $user->name = request('name');
        $user->save();
      }

      // EMAIL CHANGE VALIDATION 
      if (request('newEmail') !== null) {
        $isModified = true;
        $validator = Validator::make($request->all(), [
          'newEmail' => 'required|string|email|max:100'
        ]);
        if ($validator->fails()) {
          return response()->json($validator->error(), 422);
        }
        // ['password' => bcrypt($request->password)]
        $user->email = request('newEmail');
        $user->save();
      }

      

      if ($isModified) {
        return response()->json([
          'message' => 'User successfully updated',
          'user' => $user
        ], 200);
      }

    return response()->json([
      'message' => 'No modifications',
      // 'user' => $user
    ], 304);
  }
 
}
