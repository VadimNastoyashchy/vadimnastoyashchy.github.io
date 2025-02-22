---
title: Views
layout: page
permalink: /views.html
---

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview Data</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>
    <h1>Preview Data from Sitemap</h1>
    <table>
        <thead>
            <tr>
                <th>URL</th>
                <th>Total Views</th>
                <th>Today's Views</th>
                <th>Weekly Views</th>
                <th>Monthly Views</th>
            </tr>
        </thead>
        <tbody id="data-table">
        </tbody>
    </table>

    <script>
        // Fetch the URLs from the sitemap
        async function fetchURLsFromSitemap(sitemapUrl) {
            let response = await fetch(sitemapUrl);
            let text = await response.text();
            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(text, "text/xml");
            
            let urls = Array.from(xmlDoc.querySelectorAll("url loc")).map(node => node.textContent);
            return urls;
        }

        // Fetch preview data from the API for a specific URL
        async function fetchPreviewData(url) {
            const adjustedUrl = `https://hits.sh/api/urns/${encodeURIComponent(url)}`;
            const response = await fetch(adjustedUrl);
            const data = await response.json();

            // Find today's views
            const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
            const todayData = data.items.find(d => d.from <= today && today <= d.to);
            const todayViews = todayData ? todayData.data.find(d => d.day === today).value : 0;

            return {
                url,
                totalViews: data.total,
                todayViews,
                weeklyViews: data.weekly,
                monthlyViews: data.monthly
            };
        }

        // Fetch sitemap and preview data, then display in table
        async function displayPreviewData() {
            const sitemapUrl = 'https://vadimnastoyashchy.github.io/sitemap.xml';
            const urls = await fetchURLsFromSitemap(sitemapUrl);
            const tableBody = document.getElementById('data-table');

            for (let url of urls) {
                const previewData = await fetchPreviewData(url);

                let row = `<tr>
                    <td>${previewData.url}</td>
                    <td>${previewData.totalViews}</td>
                    <td>${previewData.todayViews}</td>
                    <td>${previewData.weeklyViews}</td>
                    <td>${previewData.monthlyViews}</td>
                </tr>`;

                tableBody.innerHTML += row;
            }
        }

        displayPreviewData();
    </script>
</body>
</html>