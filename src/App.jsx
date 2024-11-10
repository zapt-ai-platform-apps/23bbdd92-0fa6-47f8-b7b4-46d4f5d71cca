import { createSignal, onMount, createEffect, Show } from 'solid-js';
import { supabase } from './supabaseClient';
import { Auth } from '@supabase/auth-ui-solid';
import { ThemeSupa } from '@supabase/auth-ui-shared';

function App() {
  const [user, setUser] = createSignal(null);
  const [currentPage, setCurrentPage] = createSignal('login');
  const [apiResponse, setApiResponse] = createSignal(null);
  const [loading, setLoading] = createSignal(false);

  const checkUserSignedIn = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      setCurrentPage('homePage');
    }
  };

  onMount(checkUserSignedIn);

  createEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user);
        setCurrentPage('homePage');
      } else {
        setUser(null);
        setCurrentPage('login');
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCurrentPage('login');
  };

  const callApi = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/callZaptApi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: 'USER_ID',
          app_id: '93ca556c-8247-455a-bcca-d09242ac37d0',
          variables: [
            { variable: 'VARIABLE_NAME_1', value: 'VARIABLE_VALUE_1' },
            { variable: 'VARIABLE_NAME_2', value: 'VARIABLE_VALUE_2' }
          ],
          version_id: 'VERSION_ID',
          next_node_id: 'NEXT_NODE_ID'
        })
      });
      const data = await response.json();
      setApiResponse(data);
    } catch (error) {
      console.error('Error calling API:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="h-full bg-gradient-to-br from-purple-100 to-blue-100 p-4">
      <Show
        when={currentPage() === 'homePage'}
        fallback={
          <div class="flex items-center justify-center h-full">
            <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
              <h2 class="text-3xl font-bold mb-6 text-center text-purple-600">Sign in with ZAPT</h2>
              <a
                href="https://www.zapt.ai"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-500 hover:underline mb-6 block text-center"
              >
                Learn more about ZAPT
              </a>
              <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                providers={['google', 'facebook', 'apple']}
                magicLink={true}
                showLinks={false}
                view="magic_link"
              />
            </div>
          </div>
        }
      >
        <div class="max-w-3xl mx-auto">
          <div class="flex justify-between items-center mb-8">
            <h1 class="text-4xl font-bold text-purple-600">New App</h1>
            <button
              class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
          <button
            onClick={callApi}
            class={`w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
              loading() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading()}
          >
            {loading() ? 'Calling API...' : 'Call ZAPT API'}
          </button>
          <Show when={apiResponse()}>
            <div class="mt-8 bg-white p-6 rounded-lg shadow-md">
              <h2 class="text-2xl font-bold mb-4 text-purple-600">API Response</h2>
              <pre class="whitespace-pre-wrap break-all text-gray-700">{JSON.stringify(apiResponse(), null, 2)}</pre>
            </div>
          </Show>
        </div>
      </Show>
    </div>
  );
}

export default App;