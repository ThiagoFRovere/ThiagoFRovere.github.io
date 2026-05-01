document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
        const url = new URL(link.href);
        url.searchParams.set('v', Date.now());
        link.href = url.toString();
    });
});