// NOTEPAD
import note1 from "../../src/assets/notewebapp/note1-hori-overflow.png";
import note2 from "../../src/assets/notewebapp/note1-vert-overflow.png";
import note3 from "../../src/assets/notewebapp/note1-editpage.png";

// ─────────────────────────────────────────────
//  PER-PROJECT DATA
// ─────────────────────────────────────────────

const PROJECT_DATA = {
  // ── NOTE WEBAPP (/projects/ekomers) ─────────────────────────────────────────
  notewebapp: {
    title: "NOTE WEBAPP",
    liveUrl: "https://mern-notewebapp.onrender.com",
    description: `A minimal note-taking app built on the MERN stack. The main focus of this project 
      was to solidify my fundamentals — structuring RESTful API endpoints with Express, managing 
      client-server data flow, and wiring up full CRUD operations from the React frontend to a 
      MongoDB database. Also includes rate limiting via Upstash Redis to handle request throttling on 
      the backend.`,
    stack: ["React", "MongoDB", "Node.js", "Express.js"],
    features: [
      "Create, read, update, and delete notes (full CRUD)",
      "Persistent storage via MongoDB",
      "RESTful API with Express.js",
      "Toast notifications for success/error feedback",
      "Rate limit UI — shows a friendly message when the user hits the request limit",
      "Responsive layout for mobile and desktop",
      "Real-time UI state sync without page refresh",
    ],
    qaReports: [
      {
        id: "NOTE-001",
        steps: `1. Create a new note\n2.Add a title and content with 1,000 characters or more\n3. Click 'Save'`,
        expected:
          "There's should be a character counter, and the text should not overflow horizontally.",
        actual:
          "Request succeeds with no length limit enforced; no truncation or warning shown.",
        status: "pending",
        images: [note1, note2],
      },
      {
        id: "NOTE-002",
        steps: "1. Click 'Edit Icon' on one of the existing note.",
        expected:
          "The user will be directed to edit page, and it should retain the current data of that note",
        actual:
          "User will be directed to the edit page but the data is not retained.",
        status: "pending",
        images: [note3],
      },
      {
        id: "NOTE-003",
        steps:
          "1. Click the 'Delete' icon on an existing note.\n2. Confirm the deletion if prompted.",
        expected:
          "The note should be removed from the list, and a loading indicator or 'deleting' state should appear to confirm the action is in progress.",
        actual:
          "The note disappears eventually, but there is no visual feedback or 'processing' state during the API request; the UI remains static until the server responds.",
        status: "pending",
      },
      {
        id: "NOTE-004",
        steps:
          "1. Navigate to the live site URL.\n2. Observe the initial loading behavior of the notes list.",
        expected:
          "The notes should load instantly, or a loading skeleton/spinner should be displayed to indicate progress.",
        actual:
          "There is a noticeable delay before notes appear; the UI remains blank or static during the fetch process.",
        status: "pending",
      },
    ],
  },

  // ── iPASKIL (/projects/ipaskil) ─────────────────────────────────────────────
  ipaskil: {
    title: "iPASKIL",
    liveUrl: "https://vlog-mern.onrender.com",
    description: `iPaskil: A Full-Stack Creative "Paskilan".
      For this project, I wanted to build something that felt less like a simple tool and more like a 
      real-world platform. iPaskil is a digital bulletin board built on the MERN stack, designed for 
      creative expression and community interaction. While my previous projects focused on solidifying 
      my fundamentals, iPaskil is a major leap forward—it’s a centralized hub where users can post 
      multi-media content (images and videos), interact through a social ecosystem, and fully manage 
      their digital identity.

      The Purpose
      The core goal of this project was to move beyond standard CRUD operations and tackle the high-level
      complexities of Media Lifecycle Management and Role-Based Access Control (RBAC). I didn't just want 
      to save data to a database; I wanted to engineer a production-ready environment. This meant building
      a robust administrative "Command Center" for system-wide oversight and ensuring that every physical
      asset—like a user's uploaded video or profile picture—is handled responsibly. iPaskil is the 
      culmination of everything I’ve learned, bridging the gap between theory and production.`,
    stack: [
      "React",
      "MongoDB",
      "Node.js",
      "Express.js",
      "Cloudinary",
      "Axios",
      "JWT",
    ],
    features: [
      "User profiles with personalized art galleries for showcasing individual creativity",
      "Post artwork and videos with multi-tag categorization for better discoverability",
      "Community feed with real-time tag-based filtering and search functionality",
      "Engagement ecosystem including a like and save system",
      "Cloudinary integration for secure image/video upload and CDN delivery",
      "High-performance infinite scroll with lazy loading for seamless browsing",
      "Fully mobile-responsive masonry layout for a modern, Pinterest-style UI",
      "Administrative Command Center for user moderation and platform oversight",
      "Automated asset lifecycle management to prevent orphaned files in cloud storage",
      "Centralized Axios Interceptor architecture for professional JWT authentication",
    ],
    qaReports: [
      {
        id: "IPS-001",
        title: "Race Condition in Engagement Logic",
        steps:
          "Rapidly toggle the 'Like' button multiple times within a 2-second window.",
        expected:
          "Like count reflects a single consistent toggle state in the UI and Database.",
        actual:
          "Count flickers; final DB state is inconsistent with the UI display.",
        solution:
          "Implemented Optimistic UI updates and a request-locking mechanism to handle concurrent async requests.",
        status: "resolved",
      },
      {
        id: "IPS-002",
        title: "Duplicate Posts in Infinite Scroll",
        steps:
          "Trigger an infinite scroll load and quickly scroll up/down while fetching.",
        expected:
          "Unique posts are appended once; no duplicate cards appear in the feed.",
        actual:
          "The same 20 posts are appended repeatedly during rapid scroll events.",
        solution:
          "Shifted to cursor-based pagination and implemented a 'isFetching' flag to block redundant API calls.",
        status: "resolved",
      },
      {
        id: "IPS-003",
        title: "Case-Sensitive Tag Filtering",
        steps:
          "Filter the feed using 'Anime' (Uppercase) vs 'anime' (Lowercase).",
        expected:
          "Search results should be uniform regardless of tag capitalization.",
        actual:
          "Tag filter was case-sensitive; 'Anime' yielded zero results for lowercase entries.",
        solution:
          "Applied text normalization logic to convert all tags to lowercase during save and query operations.",
        status: "resolved",
      },
      {
        id: "IPS-004",
        title: "Asset Validation Bypass",
        steps:
          "Attempt to create a post with text only, omitting the image attachment.",
        expected:
          "Validation error: 'An image is required to publish artwork.'",
        actual:
          "Post is created with a null field, resulting in broken image icons in the feed.",
        solution:
          "Enforced Mongoose schema-level validation and frontend button-disabling for empty media states.",
        status: "resolved",
      },
      {
        id: "IPS-005",
        title: "Cloudinary Asset Orphanage (Storage Leak)",
        steps:
          "Delete a post or update a profile picture and check the Cloudinary dashboard.",
        expected:
          "The physical file is removed from the CDN storage upon database deletion.",
        actual:
          "DB record is removed, but physical files remained in Cloudinary as 'ghost' assets.",
        solution:
          "Integrated Cloudinary's Destroy API into the backend controller to sync physical file deletion with DB updates.",
        status: "resolved",
      },
      {
        id: "IPS-006",
        title: "Layout Overflow & Content Truncation",
        steps:
          "Input a 500+ character description and view in the masonry grid.",
        expected:
          "The card maintains a consistent height with a 'See More' toggle.",
        actual:
          "Long text caused vertical overflow, breaking the Pinterest-style grid alignment.",
        solution:
          "Implemented a character counter with conditional rendering and a 'See More' expansion toggle.",
        status: "resolved",
      },
      {
        id: "IPS-007",
        title: "User Profile State Persistence",
        steps: "Update profile name/tag-line and manually refresh the browser.",
        expected: "Updated data persists and displays immediately upon reload.",
        actual:
          "Profile reverted to stale data after refresh due to lack of synchronization.",
        solution:
          "Updated AuthContext to fetch latest metadata on mount and ensured LocalStorage/JWT sync post-mutation.",
        status: "resolved",
      },
      {
        id: "IPS-008",
        title: "Admin Moderation: Deep Linking Failure",
        steps:
          "Click the 'eye' icon in the Admin Command Center to view a specific flagged post.",
        expected:
          "Direct navigation to the specific post detail page (/posts/:id).",
        actual:
          "Redirects to the general landing page (/posts), losing the specific post context.",
        solution:
          "In Progress: Refactoring admin action handlers to use dynamic routing with unique post IDs.",
        status: "open",
      },
      {
        id: "IPS-009",
        title: "Auth State 'Refresh Jump'",
        steps: "Refresh the browser while on a protected route.",
        expected: "The user should remain on the page if a valid token exists.",
        actual:
          "App briefly redirects to /login before the token validation finishes.",
        solution:
          "Added an 'isLoading' state to the Auth provider to defer routing until auth verification is complete.",
        status: "resolved",
      },
      {
        id: "IPS-010",
        title: "JWT Authorization Header Omission",
        steps:
          "Perform a protected action (delete/edit) and monitor the network tab.",
        expected: "Request includes 'Authorization: Bearer <token>' header.",
        actual:
          "Request failed with 401 Unauthorized because the token was missing from the header.",
        solution:
          "Implemented a centralized Axios Interceptor to automatically attach JWTs to every outgoing API request.",
        status: "resolved",
      },
    ],
    images: [note1, note2],
  },

  ekomers: {
    title: "EKOMERS",
    liveUrl: "https://ekomers-mern.onrender.com",
    description: `EKOMERS: A Full-Stack Streetwear E-Commerce Platform.
      EKOMERS is a production-grade MERN stack e-commerce application built for a real-world 
      streetwear brand. The goal was never just to build a "shopping cart" — it was to engineer 
      a complete commerce ecosystem from the ground up. This means a fully functioning payment 
      pipeline with PayMongo (GCash, Maya, Card, QR PH), a role-based admin command center, 
      real-time inventory management, and a logistics system complete with printable waybills.

      The Purpose
      EKOMERS was built to solve the hardest problems in e-commerce: secure payment flows, 
      webhook reliability, session management at scale, and multi-actor data integrity. 
      Every technical decision was made with production in mind — from JWT token rotation 
      and silent refresh interceptors, to server-side price verification that prevents 
      client-side manipulation. The admin panel handles everything from order fulfillment 
      and stock depletion to user management and store configuration. EKOMERS is the most 
      complex system I've built, and it pushed me to think like an architect, not just a developer.`,
    stack: [
      "React",
      "MongoDB",
      "Node.js",
      "Express.js",
      "PayMongo",
      "Cloudinary",
      "Brevo",
      "Leaflet",
      "JWT",
      "Axios",
      "Recharts",
      "DaisyUI",
      "TailwindCSS",
    ],
    features: [
      "Full PayMongo checkout pipeline supporting GCash, Maya, Card, GrabPay, and QR PH",
      "Webhook-driven order confirmation with HMAC-SHA256 signature verification",
      "QR PH polling system with 3-minute timeout and automatic fallback confirmation",
      "Role-based access control (RBAC) with admin and user protected routes",
      "Unified dashboard for both admin and user roles using React Router Outlet",
      "Real-time inventory tracker with per-size stock depletion on order fulfillment",
      "Admin order manifest with status pipeline: Pending → Shipped → Delivered → Cancelled",
      "Printable logistics waybill modal with item-level verification checklist",
      "Cloudinary image lifecycle management with orphan cleanup on product/user deletion",
      "Silent JWT refresh interceptor with queued request replay on token expiry",
      "Email verification flow and 6-digit OTP system for password change and account deletion",
      "Geoapify map integration for address autocomplete with Philippines filter",
      "Admin sales intelligence dashboard with timeline charts and low-stock alerts",
      "Drag-and-drop product category and size reordering using @hello-pangea/dnd",
      "Optimistic UI updates in cart with quantity rollback on server error",
      "Server-side price verification for QR PH to prevent client-side amount manipulation",
      "Selective cart checkout — users choose which items to purchase, not the entire cart",
    ],
    qaReports: [
      {
        id: "EKO-001",
        title: "Recursive Password Hashing (Double-Hash Bug)",
        steps:
          "Update password via Privacy Settings OTP flow and attempt authentication.",
        expected: "Successful login with the updated plaintext password.",
        actual:
          "Authentication failure. The password was hashed during the controller logic and re-hashed by the Mongoose 'pre-save' hook, making it invalid.",
        solution:
          "Removed manual hashing in the controller. By assigning the plaintext password directly to user.password, the system now relies solely on the middleware hook for a single, consistent hash cycle.",
        status: "resolved",
      },
      {
        id: "EKO-002",
        title: "Webhook Payload Integrity Failure (Render.com)",
        steps:
          "Execute a live GCash transaction and monitor the PayMongo webhook response.",
        expected:
          "HTTP 200: Webhook signature verified and order status updated to 'In Progress'.",
        actual:
          "HTTP 401: Signature mismatch. Render's environment was parsing the JSON body before verification, altering the raw string used for HMAC-SHA256.",
        solution:
          "Implemented a custom 'verify' callback in express.json() to capture the 'req.rawBody' as a buffer. This ensures the signature is compared against the exact, unparsed payload string.",
        status: "resolved",
      },
      {
        id: "EKO-003",
        title: "Data Type Mismatch in Selective Checkout",
        steps: "Select specific cart items (checkbox) and proceed to checkout.",
        expected:
          "Only checked items are processed; unselected items remain in the cart.",
        actual:
          "Checkout session is empty. Logic failed to match Frontend String IDs with Backend MongoDB ObjectIDs.",
        solution:
          "Standardized ID comparison by explicitly casting all identifiers to String() before filtering the cart array during the order creation pipeline.",
        status: "resolved",
      },
      {
        id: "EKO-004",
        title: "Price Manipulation Vulnerability (QR PH)",
        steps:
          "Intercept a QR PH payment request and modify the 'amount' field in the payload.",
        expected:
          "Server rejects the request or overrides the amount with valid database pricing.",
        actual:
          "The system trusted the client-side total, allowing users to potentially set their own price.",
        solution:
          "Zero-trust architecture implementation: The backend now ignores the client-sent total, fetches item prices directly from MongoDB, and recalculates the final amount server-side before calling the PayMongo API.",
        status: "resolved",
      },
      {
        id: "EKO-005",
        title: "Webhook Idempotency (Duplicate Order Creation)",
        steps:
          "Simulate a PayMongo webhook retry (double-firing) for a single payment session.",
        expected: "Exactly one order record is generated in the database.",
        actual:
          "Duplicate orders were created for the same transaction, resulting in redundant fulfillment records.",
        solution:
          "Added an idempotency guard using 'Order.findOne({ checkoutSessionId })'. The handler now performs an early exit if the session has already been processed.",
        status: "resolved",
      },
      {
        id: "EKO-006",
        title: "Race Condition: Webhook vs. Frontend Polling",
        steps:
          "Pay via QR PH and observe the simultaneous firing of the webhook and the polling fallback.",
        expected: "Atomic update of stock and cart status.",
        actual:
          "Stock was deducted twice because both the webhook and the fallback endpoint executed the fulfillment logic concurrently.",
        solution:
          "Implemented an 'alreadyConfirmed' check. Both endpoints now check the paymentStatus atomically; if the status is already 'paid', the second process returns without executing mutations.",
        status: "resolved",
      },
      {
        id: "EKO-007",
        title: "Auth Flash & UI Flickering on Refresh",
        steps:
          "Hard-refresh (F5) the browser while on a protected Admin route.",
        expected:
          "Seamless session restoration without leaving the dashboard view.",
        actual:
          "Visible redirect to home '/' before bouncing back to the dashboard once auth resolved.",
        solution:
          "Introduced an 'isLoading' state in AuthContext. ProtectedRoutes now render a global loading spinner until the 'getCurrentUser' API call completes.",
        status: "resolved",
      },
      {
        id: "EKO-008",
        title: "Interception Loop on Public Endpoints",
        steps: "Submit invalid credentials on the Login page.",
        expected: "Single 401 error message displayed to the user.",
        actual:
          "The Axios interceptor caught the 401 and attempted an infinite token refresh loop.",
        solution:
          "Created a 'publicEndpoints' whitelist in the interceptor logic to bypass the refresh-retry cycle for login, register, and refresh routes.",
        status: "resolved",
      },
      {
        id: "EKO-009",
        title: "CDN Asset Leakage on Product Deletion",
        steps:
          "Remove a product from the inventory and verify Cloudinary storage.",
        expected:
          "Physical media is deleted from the CDN along with the database record.",
        actual:
          "MongoDB record was deleted, but images remained on Cloudinary as orphaned files.",
        solution:
          "Developed a cleanup utility using 'cloudinary.uploader.destroy' within a 'Promise.allSettled' block to ensure all associated images are wiped when a product is removed.",
        status: "resolved",
      },
      {
        id: "EKO-010",
        title: "Inventory Leakage (Stock Restoration Logic)",
        steps: "Cancel a paid order from the Admin panel.",
        expected:
          "Stock counts for all items in the order are automatically incremented.",
        actual:
          "Order status changed to 'Cancelled', but inventory remained depleted (Phantom Stock Loss).",
        solution:
          "Modified the 'updateOrderStatus' controller to include a conditional '$inc' operation. Stock is now restored only when transitioning to a 'Cancelled' state from a previously 'Paid' state.",
        status: "resolved",
      },
      {
        id: "EKO-011",
        title: "Global State De-synchronization (Avatar Upload)",
        steps:
          "Change profile picture and immediately navigate to Checkout or Navbar.",
        expected:
          "The new image persists globally across all UI components instantly.",
        actual:
          "Navbar and Checkout still displayed stale images until a hard refresh.",
        solution:
          "Implemented a two-part fix: frontend 'setUser' state update post-upload and a custom window event dispatcher to alert unrelated components to re-fetch metadata.",
        status: "resolved",
      },
      {
        id: "EKO-012",
        title: "Email Token Burn (StrictMode Double-Invocation)",
        steps: "Click the verification link in a development environment.",
        expected: "One successful API call and a 'Verified' confirmation.",
        actual:
          "React StrictMode fired the effect twice; the second call failed with 'Invalid Token' because the first call already consumed it.",
        solution:
          "Implemented a 'useRef' guard (hasRun) within the useEffect hook to lock the execution, ensuring the verification API is only called once per mount.",
        status: "resolved",
      },
      {
        id: "EKO-013",
        title: "Stock Ceiling Validation Bypass",
        steps:
          "Increment cart quantity beyond the stock limit of a specific size.",
        expected: "UI blocks the increment and displays a 'Max Stock' toast.",
        actual:
          "Validation checked total product stock instead of size-specific stock, allowing over-ordering.",
        solution:
          "Refactored 'updateCartItem' logic to filter the 'sizes' array by the selected size and use that specific 'sizeData.stock' as the validation ceiling.",
        status: "resolved",
      },
      {
        id: "EKO-014",
        title: "UX Disruption: Printing Waybills",
        steps: "Click 'Print' in the Logistics Waybill Modal.",
        expected: "Silent print dialog trigger without session interruption.",
        actual:
          "New tab opened, losing the admin's scroll position and disrupting the session flow.",
        solution:
          "Switched to a hidden 'iframe' approach. The waybill is injected into the iframe and printed via 'contentWindow.print()', keeping the main UI intact.",
        status: "resolved",
      },
      {
        id: "EKO-015",
        title: "Route Shadowing & Controller Conflict",
        steps: "Access /api/admin/users while /api/settings was registered.",
        expected: "The Admin Router handles the request.",
        actual:
          "The catch-all settings route intercepted the request, leading to 404 or Unauthorized errors.",
        solution:
          "Restructured the Express route registry using 'Specific-to-General' ordering, ensuring specialized admin subroutes are checked before catch-all routers.",
        status: "resolved",
      },
      {
        id: "EKO-016",
        title: "Mutation Conflict: 'Buy Now' vs. Cart State",
        steps:
          "Perform a direct 'Buy Now' purchase via QR PH and check the cart.",
        expected: "Cart remains unchanged.",
        actual:
          "The entire cart was cleared, including items not part of the direct purchase.",
        solution:
          "Added an 'isDirectPurchase' flag to the order schema. The fulfillment controller now checks this flag to determine whether to skip or execute the cart-clear mutation.",
        status: "resolved",
      },
      {
        id: "EKO-018",
        title: "Cart Mutation Conflict: Direct Purchase vs. Bulk Checkout",
        steps:
          "1. Add Item A to cart. 2. Click 'Buy Now' on Item B. 3. Complete payment for Item B.",
        expected: "Item B is purchased; Item A remains in the cart for later.",
        actual:
          "The system cleared the entire cart post-payment, erroneously treating the 'Buy Now' action as a full cart checkout.",
        solution:
          "Segmented the checkout logic by introducing an 'isDirectPurchase' flag in the Order Schema. The fulfillment webhook now conditionally clears only the specific 'purchasedItems' array rather than the global user cart.",
        status: "resolved",
      },
      {
        id: "EKO-019",
        title: "Inconsistent Totals on Cart Page vs. Checkout Session",
        steps:
          "Modify item quantities in the cart and immediately click 'Checkout'.",
        expected:
          "The PayMongo checkout session reflects the most recent quantities and prices.",
        actual:
          "Occasional mismatch where the checkout session used stale data from the previous state before the database update finished.",
        solution:
          "Synchronized the 'Create Checkout' trigger with a 'Promise.all' check to ensure all pending cart 'PUT' requests are resolved before initiating the payment intent.",
        status: "resolved",
      },
      {
        id: "EKO-020",
        title: "Checkout Session Expiry & Inventory Lock",
        steps:
          "Initiate a GCash payment but close the tab or let the 3-minute QR PH timer expire.",
        expected:
          "The transaction is voided and stock is not permanently deducted.",
        actual:
          "Stock remained 'locked' or 'reserved' for incomplete transactions, leading to inaccurate inventory counts for other users.",
        solution:
          "Implemented a 'Timeout Fallback' in the QR PH polling service. If the 180-second window expires without a 'paid' webhook event, the system automatically releases the temporary stock reservation.",
        status: "resolved",
      },
      {
        id: "EKO-021",
        title: "Socket.IO Authentication Failure on Token Expiry",
        steps:
          "Keep the app open until the 15-minute JWT access token expires, then attempt to send a chat message.",
        expected: "Socket reconnects transparently using the refreshed token.",
        actual:
          "Socket connection drops with 'Invalid token' error. The Socket.IO handshake uses the access token from the initial cookie, but the cookie is rotated by the Axios interceptor without re-initializing the socket.",
        solution:
          "Added a reconnection trigger in SocketContext that listens for the 'auth-synchronized' custom event. When the interceptor fires a token refresh, the socket disconnects and re-initiates the handshake with the new accessToken cookie.",
        status: "resolved",
      },
      {
        id: "EKO-022",
        title: "Typing Indicator Phantom State After Conversation Switch",
        steps:
          "Open AdminChatPage, switch between two conversations rapidly while one user is actively typing.",
        expected:
          "Typing indicator reflects only the active conversation's state.",
        actual:
          "The 'isTyping' state persists from a previous conversation even after switching. The socket 'leave_conversation' cleanup fires but the local React state is never reset.",
        solution:
          "Added an explicit 'setIsTyping(false)' call inside the 'openConversation' function before mounting new socket listeners, and ensured the cleanup function in the socket useEffect resets typing state on unmount.",
        status: "resolved",
      },
      {
        id: "EKO-023",
        title: "Wishlist Toggle Desync on Rapid Clicks",
        steps:
          "Click the wishlist heart button rapidly multiple times in quick succession on a product card.",
        expected: "Final state matches the actual backend wishlist state.",
        actual:
          "Race condition between simultaneous POST requests causes inconsistent UI — the heart toggles to an incorrect state because multiple responses arrive out of order.",
        solution:
          "Implemented a debounce lock using a 'pending' ref in the toggleWishlist callback. Subsequent clicks are blocked until the in-flight request resolves, preventing overlapping mutations.",
        status: "resolved",
      },
      {
        id: "EKO-024",
        title: "Admin Role Promotion Self-Demotion Bypass",
        steps:
          "As an admin, open the User Management dropdown on your own account row and select 'Demote to User'.",
        expected: "Backend rejects the request with a clear error message.",
        actual:
          "The frontend dropdown renders without restriction. Although the backend guard exists, the UI provides no feedback and the admin momentarily loses dashboard access before the error is caught.",
        solution:
          "Added a client-side check comparing 'user._id === targetUser._id' before rendering the demotion option. The dropdown now hides the 'Demote' action entirely for the currently logged-in admin's own row.",
        status: "resolved",
      },
      {
        id: "EKO-025",
        title: "Product Edit Modal Orphaned Image Leak on Cancel",
        steps:
          "Open the Product Edit Modal, upload 2 new images, then click 'Cancel' instead of 'Save'.",
        expected:
          "Newly uploaded images are deleted from Cloudinary since they were never committed.",
        actual:
          "Images are uploaded to Cloudinary on file selection but never cleaned up when the modal is dismissed without saving.",
        solution:
          "Implemented a 'sessionImagesRef' tracking newly uploaded images during the session. The useEffect cleanup function calls 'uploadAPI.deleteImage' for each tracked publicId when the component unmounts without a successful submit.",
        status: "resolved",
      },
      {
        id: "EKO-026",
        title: "Stale Closure in QR PH Polling (activeAddress)",
        steps:
          "Open checkout, select a secondary address from the modal, then immediately click 'Pay via QR PH'.",
        expected:
          "QR PH payment intent is created with the newly selected address.",
        actual:
          "The polling callback captures 'activeAddress' via closure at initialization time. If the address changes after the interval starts, the shipping info in the pending order reflects the old address.",
        solution:
          "Replaced direct 'activeAddress' reference in the polling callback with 'activeAddressRef.current'. A separate useEffect syncs the ref whenever 'activeAddress' state changes, breaking the stale closure.",
        status: "resolved",
      },
      {
        id: "EKO-027",
        title: "Pagination Page Reset on Admin Inventory Filter Change",
        steps:
          "Navigate to page 3 of Admin Inventory, then change the category filter dropdown.",
        expected: "Results reset to page 1 with the new category applied.",
        actual:
          "The page number stays at 3 but the new category has fewer results, causing an empty state or incorrect offset even though data exists on page 1.",
        solution:
          "Added a useEffect that watches 'debouncedSearch', 'categoryFilter', and 'pageSize' as dependencies and calls 'setCurrentPage(1)' on any change, ensuring pagination always resets when filters are modified.",
        status: "resolved",
      },
      {
        id: "EKO-028",
        title: "Message Duplication in Real-Time Chat",
        steps:
          "Send a message via the ChatModal or AdminChatPage while both socket and HTTP response are active.",
        expected: "Exactly one message bubble appears per sent message.",
        actual:
          "Two identical message bubbles appear — one added optimistically when the API responds, and a second injected by the socket 'new_message' event firing for the sender's own message.",
        solution:
          "Added deduplication guards using 'prev.find(m => m._id === msg._id)' before pushing to the messages array in both 'handleNewMessage' socket handlers, preventing the same message from being appended twice.",
        status: "resolved",
      },
      {
        id: "EKO-029",
        title: "Navbar Search Autocomplete Persists After Navigation",
        steps:
          "Type a search query in the navbar, click a product suggestion, then press the browser back button.",
        expected: "Search input clears and suggestion dropdown closes.",
        actual:
          "The suggestion dropdown remains visible and 'showSuggestions' state stays true because the URL change is handled by React Router without triggering the dropdown's close logic.",
        solution:
          "Added a useEffect watching 'location.pathname' that calls 'setShowSuggestions(false)' on route change, and bound the 'handleClickOutside' listener to include the mobile search ref.",
        status: "resolved",
      },
      {
        id: "EKO-030",
        title: "Order Status Resurrection (Cancelled → Active)",
        steps:
          "In Admin Orders, use the status dropdown to change a user-cancelled order back to 'Order in Progress'.",
        expected: "Backend rejects the state transition with a clear error.",
        actual:
          "The admin UI allows selecting any status from the dropdown regardless of the current order state. A previously cancelled order (with stock already restored) can be resurrected, creating phantom active orders with no inventory backing.",
        solution:
          "Added a guard in 'updateOrderStatus' controller: if 'order.status === Cancelled' and the new status is not 'Cancelled', the server returns HTTP 400. The admin dropdown also disables non-cancelled options for already-cancelled orders on the frontend.",
        status: "resolved",
      },
      {
        id: "EKO-031",
        title: "Leaflet Map Tile Rendering Failure in Address Modal",
        steps:
          "Open the Address Settings page and click 'Add New Node' to open the map modal.",
        expected: "Map renders immediately with full tile coverage.",
        actual:
          "Map tiles fail to load or display a grey void on first open. Leaflet calculates the container size before the modal's CSS transition completes, resulting in incorrect tile bounds.",
        solution:
          "Implemented a 'MapInvalidator' component that calls 'map.invalidateSize()' inside a 400ms setTimeout after mount, forcing Leaflet to recalculate dimensions after the modal animation finishes.",
        status: "resolved",
      },
      {
        id: "EKO-032",
        title: "Silent Cart Fetch After Payment Success Race Condition",
        steps:
          "Complete a GCash checkout and observe the PaymentSuccess page cart refresh timing.",
        expected:
          "Cart shows zero items from the purchased session after refresh.",
        actual:
          "The 'fetchCart()' call on the PaymentSuccess page fires before the PayMongo webhook has processed and cleared the cart items from the database, showing stale items briefly.",
        solution:
          "Introduced a deliberate 1500ms delay via 'setTimeout' before calling 'fetchCart(false)' on the PaymentSuccess page, providing the webhook sufficient processing time before the frontend re-syncs cart state.",
        status: "resolved",
      },
    ],
  },
};

export default PROJECT_DATA;
