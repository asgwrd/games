(function() {
    // Create the overlay element
    let overlay = document.createElement('div');
    overlay.id = 'auth-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'white';
    overlay.style.zIndex = '9999';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.innerHTML = '<div style="text-align: center;"><h2>Access Denied</h2><p>Please refresh the page to enter the passcode.</p></div>';
    document.body.appendChild(overlay);

    // Cookie functions
    function getCookie(name) {
        let cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            let [cookieName, cookieValue] = cookie.split('=');
            if (cookieName.trim() === name) return decodeURIComponent(cookieValue);
        }
        return null;
    }

    function setCookie(name, value) {
        document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=2147483647`;
    }

    function deleteCookie(name) {
        document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }

    // Auth check logic
    async function checkAuth() {
        const authCookie = getCookie('auth');
        const validPass = 'hawktuahaoeneedstobenerfed69420';

        if (authCookie) {
            const [savedPass, savedUid] = authCookie.split(':');
            if (savedPass === validPass) {
                try {
                    const isBanned = await checkUidStatus(savedUid);
                    if (isBanned) {
                        deleteCookie('auth');
                        return; // Keep overlay visible
                    }
                    removeOverlay();
                    return;
                } catch (error) {
                    // Server unavailable - allow access
                    removeOverlay();
                    return;
                }
            }
        }

        // No valid cookie - prompt for password
        const passcode = prompt('Enter the passcode:');
        if (passcode === validPass) {
            const uid = generateUid();
            
            try {
                const isBanned = await checkUidStatus(uid);
                if (isBanned) {
                    alert('System error: Please try again');
                    return;
                }
            } catch (error) {
                // Server unavailable - proceed anyway
            }
            
            setCookie('auth', `${passcode}:${uid}`);
            removeOverlay();
        } else {
            alert('Incorrect passcode');
        }
    }

    async function checkUidStatus(uid) {
        try {
            const response = await fetch(`http://66.24.73.252:5000/check_uid?uid=${uid}`, {
                signal: AbortSignal.timeout(3000)
            });
            if (!response.ok) throw new Error('Server error');
            const data = await response.json();
            return data.banned;
        } catch (error) {
            console.error('UID check failed:', error);
            throw error; // Throw error to be handled upstream
        }
    }

    function generateUid() {
        return Math.floor(100 + Math.random() * 900); // 100-999
    }

    function removeOverlay() {
        const overlay = document.getElementById('auth-overlay');
        if (overlay) overlay.remove();
    }

    checkAuth();
})();