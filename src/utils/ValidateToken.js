export default function ValidateToken() {
    const hasTokenInLocalStorage = localStorage.getItem("token") !== null;
    if (!hasTokenInLocalStorage) window.location.href = "/login";
    return;
}