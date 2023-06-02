<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;

class GoogleController extends Controller
{

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        // 'except' specify that in the method 'auth' the token is not required
        $this->middleware(['auth:api'], ['except' => ['auth']]);
    }
    /**
     * Create a new user in BDD and log it if he's not already register
     */
    public function auth(Request $request): JsonResponse
    {
        // Find user where google_id match
        $findUser = User::where('google_id', $request->sub)->first();

        if ($findUser) {
            // Log the user in the application
            $token = auth()->login($findUser);

            return $this->createNewToken($token);
        } else {
            // If user is not find, create a new one
            $id = $request->sub;
            $name = $request->name;
            $email = $request->email;
            $picture = $request->picture;

            $newUser = User::create([
                'name' => $name,
                'email' => $email,
                'google_id' => $id,
                'picture' => $picture,
                'password' => Hash::make('musclay')
            ]);
            // Return user object with token
            $token = auth()->login($newUser);
            return $this->createNewToken($token);
        }
    }

    protected function createNewToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }
}
