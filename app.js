const supabase = window.supabase.createClient(
    'YOUR_SUPABASE_URL',   // Get from Supabase → Settings → API
    'YOUR_ANON_KEY',       // Get from Supabase → Settings → API
    {
        auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true
        }
    }
);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.password-toggle').forEach(button => {
        button.addEventListener('click', (e) => {
            const input = button.closest('.input-group').querySelector('input');
            input.type = input.type === 'password' ? 'text' : 'password';
            button.classList.toggle('active');
        });
    });

    document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const button = e.target.querySelector('button[type="submit"]');
        const spinner = button.querySelector('.loading-spinner');
        
        try {
            button.disabled = true;
            spinner.style.display = 'inline-block';
            spinner.style.left = '142.5px';
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            
            if (!data.user.email_confirmed_at) {
                await supabase.auth.signOut();
                throw new Error('Please verify your email before logging in');
            }

            showToast('Logged in successfully!', 'success');
            setTimeout(() => window.location.href = '/dashboard', 2000);
        } catch (error) {
            button.disabled = false;
            spinner.style.display = 'none';
            showToast(error.message, 'error');
        }
    });

    document.getElementById('signupForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const button = e.target.querySelector('button[type="submit"]');
        const spinner = button.querySelector('.loading-spinner');
        
        try {
            button.disabled = true;
            spinner.style.display = 'inline-block';
            spinner.style.left = '105px';
            
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const displayName = document.getElementById('displayName').value;

            const { data: { users }, error: lookupError } = await supabase.auth.admin.listUsers({
                email: email
            });
            
            if (users && users.length > 0) {
                throw new Error('User already exists. Please login instead.');
            }
        
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { display_name: displayName },
                    emailRedirectTo: window.location.origin
                }
            });
            
            if (error) throw error;
            
            showToast('Verification email sent!', 'success');
            setTimeout(() => window.location.href = '/login', 2000);
        } catch (error) {
            button.disabled = false;
            spinner.style.display = 'none';
            showToast(error.message, 'error');
        }
    });

    document.getElementById('resetForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const button = e.target.querySelector('button[type="submit"]');
        const spinner = button.querySelector('.loading-spinner');
        
        try {
            button.disabled = true;
            spinner.style.display = 'inline-block';
            
            const email = document.getElementById('resetEmail').value;
            
            const { data: { users }, error: lookupError } = await supabase.auth.admin.listUsers({
                email: email
            });
            
            if (lookupError) throw lookupError;
            if (users?.length === 0) {
                throw new Error('No account found with this email');
            }

            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.origin + '/update-password'
            });
            
            if (error) throw error;
            
            showToast('Reset link sent!', 'success');
            setTimeout(() => window.location.href = '/login', 2000);
        } catch (error) {
            button.disabled = false;
            spinner.style.display = 'none';
            showToast(error.message, 'error');
        }
    });

    if (lookupError) throw lookupError;
    if (users?.length === 0) {
        throw new Error('No account found with this email');
    }

    document.getElementById('logoutBtn')?.addEventListener('click', async () => {
        await supabase.auth.signOut();
        window.location.href = '/';
    });

    const authPages = ['/', '/login', '/signup', '/reset-password'];
    if (authPages.includes(window.location.pathname)) {
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (user) window.location.href = '/dashboard';
        });
    }
});

function showToast(message, type) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} visible`;
    setTimeout(() => toast.classList.remove('visible'), 3000);
}

async function init() {
    const { data: { user } } = await supabase.auth.getUser();
    const authPages = ['/', '/login', '/signup', '/reset-password'];
    if (user && authPages.includes(window.location.pathname)) {
        window.location.href = '/dashboard';
    }
}

init();