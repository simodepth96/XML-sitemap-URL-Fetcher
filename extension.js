javascript:(function() {
    // Icon image data URL
    let icon = document.createElement("img");
    icon.src = chrome.runtime.getURL("icon.png");
    icon.style.position = "fixed";
    icon.style.top = "10px";
    icon.style.right = "10px";
    icon.style.width = "32px";
    icon.style.height = "32px";
    document.body.appendChild(icon);

    // Function to fetch URLs from the XML sitemap
    function fetchUrlsFromSitemap(sitemapUrl) {
        fetch(sitemapUrl)
            .then(response => response.text())
            .then(data => {
                // Parse XML data
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data, "text/xml");
                
                // Get all <loc> elements
                const locElements = xmlDoc.getElementsByTagName("loc");
                
                // Extract URLs from <loc> elements
                const urls = [];
                for (let i = 0; i < locElements.length; i++) {
                    const url = locElements[i].textContent;
                    urls.push(url);
                }
                
                // Copy URLs to the clipboard
                const urlsString = urls.join("\n");
                navigator.clipboard.writeText(urlsString)
                    .then(() => alert("URLs copied to clipboard:\n" + urlsString))
                    .catch(error => console.error("Error copying URLs to clipboard:", error));
            })
            .catch(error => {
                console.error("Error fetching the sitemap:", error);
                alert("Error fetching the sitemap. Please check the URL and try again.");
            });
    }
    
    // Prompt the user for the URL of the XML sitemap
    const sitemapUrl = prompt("Enter the URL of the XML sitemap:");
    if (sitemapUrl) {
        fetchUrlsFromSitemap(sitemapUrl);
    } else {
        console.log("No URL provided. Please enter the URL of the XML sitemap.");
    }
})();
