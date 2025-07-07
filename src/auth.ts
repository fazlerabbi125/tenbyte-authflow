import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import Google from "next-auth/providers/google";
import AxiosServices from "./services/axios.service";
import type { LoginResponse } from "./lib/types/response/auth.res";
import APIRoutes from "./config/api-routes";
import { nextAuthConfig } from "./config/next-auth.config";

export const { auth, signIn, signOut, unstable_update } = NextAuth({
    ...nextAuthConfig,
    providers: [
        Credentials({
            id: "login",
            name: "Login",
            credentials: {
                email: { label: "Email address", type: "email", required: true },
                password: { label: "Password", type: "password", required: true, minLength: 8 },
            },

            async authorize({ email, password }) {
                try {
                    const {
                        data: { access_token, refresh_token, result },
                    } = await AxiosServices.post<LoginResponse>(APIRoutes.login, {
                        email,
                        password,
                    });
                    return { access_token, refresh_token, userInfo: result };
                } catch (error) {
                    console.error("Login error:", error);
                    return null;
                }
            },
        }),
        Credentials({
            id: "register",
            name: "Registration",
            credentials: {
                email: { label: "Email address", type: "email", required: true },
                password: { label: "Password", type: "password", required: true, minLength: 8 },
                first_name: { label: "First Name", type: "text", required: true },
                last_name: { label: "Last Name", type: "text", required: true },
                newsletter: { label: "Newsletter", type: "checkbox", default: false },
            },

            async authorize(credentials) {
                try {
                    const {
                        data: { access_token, refresh_token, result },
                    } = await AxiosServices.post<LoginResponse>(APIRoutes.register, credentials);
                    return { access_token, refresh_token, userInfo: result };
                } catch (error) {
                    console.error("Registration error:", error);
                    return null;
                }
            },
        }),
        // Google({
        //     clientId: "",
        //     clientSecret: "",
        /**
         * The login process will be initiated by sending the user to this URL.
         *
         * [Authorization endpoint](https://datatracker.ietf.org/doc/html/rfc6749#section-3.1)
         */
        //   authorization?: string | AuthorizationEndpointHandler
        // authorization: {
        //     params: {
        //         prompt: "consent",
        //         access_type: "offline",
        //         response_type: "code",
        /* Scopes
https://www.googleapis.com/auth/user.birthday.read	See and download your exact date of birth
https://www.googleapis.com/auth/user.gender.read	See your gender
https://www.googleapis.com/auth/user.phonenumbers.read	See and download your personal phone numbers
https://www.googleapis.com/auth/userinfo.email	See your primary Google Account email address
https://www.googleapis.com/auth/userinfo.profile See your personal info, including any personal info you've made publicly available
            */
        //         // redirect_uri: process.env.NEXTAUTH_URL
        //         //     ? `${process.env.NEXTAUTH_URL}/api/auth/callback/google`
        //         //     : "",
        //     },
        // },
        /**
         * Receives the full {@link Profile} returned by the OAuth provider, and returns a subset.
         * It is used to create the user in the database.
         *
         * Defaults to: `id`, `email`, `name`, `image`
         *
         * @see [Database Adapter: User model](https://authjs.dev/reference/core/adapters#user)
         */
        //   profile?: ProfileCallback<Profile>
        /**
         * Receives the full {@link TokenSet} returned by the OAuth provider, and returns a subset.
         * It is used to create the account associated with a user in the database.
         *
         * :::note
         * You need to adjust your database's [Account model](https://authjs.dev/reference/core/adapters#account) to match the returned properties.
         * Check out the documentation of your [database adapter](https://authjs.dev/reference/core/adapters) for more information.
         * :::
         *
         * Defaults to: `access_token`, `id_token`, `refresh_token`, `expires_at`, `scope`, `token_type`, `session_state`
         * account?: AccountCallback
         * token?: string | TokenEndpointHandler
         * userinfo?: string | UserinfoEndpointHandler
         */
        // }),
    ],
});
