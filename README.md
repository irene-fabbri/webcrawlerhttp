# Website Crawler

This tool crawls a website starting from a provided URL, extracts all internal links, and reports them. It helps you analyze the structure of a website by identifying all the pages that are linked from the starting page.

## Features

- Crawls a website starting from a base URL.
- Extracts all internal links on each page.
- Ignores external links and non-HTML content.
- Provides a simple report of all the pages visited and the number of times they were encountered during crawling.

## Files

### 1. `main.js`

The entry point for the application that accepts the base URL of the website to crawl as a command-line argument, and starts the crawling process.

### 2. `crawl.js`

Contains the logic for crawling pages, extracting URLs, and ensuring that pages are not revisited. It uses `jsdom` to parse the HTML content and extract links.

### 3. `report.js`

Handles the generation of the crawl report.

## Installation

1. Clone the repository.
2. Install the required dependencies:
    ```bash
    npm install jsdom
    ```

## Usage

To start the crawl, run the following command in your terminal:

```bash
npm start <baseURL>
```

Where `<baseURL>` is the starting point for the crawler (e.g., `https://example.com`).

### Example:

```bash
npm start https://example.com
```

### Validations:
- If no URL is provided: The program will log `no website provided` and exit with an error code `1`.
- If too many arguments are provided: The program will log `too many command line arguments` and exit with an error code `1`.

## How It Works

1. **Command-line Input:**
   - The program expects the base URL of the website to be provided via the command line.
   - If no URL is given or multiple arguments are provided, the program will exit with an error.

2. **Crawling Pages:**
   - The crawler starts from the base URL and makes HTTP requests to fetch each page.
   - It checks if the page is HTML and if it belongs to the same domain (ignores external links).
   - It extracts all the internal links from each page and recursively crawls those pages.

3. **Handling Pages:**
   - Pages are tracked to ensure that they are not crawled multiple times.
   - URLs are normalized to avoid duplicates (e.g., URLs with trailing slashes are treated as the same).

4. **Output:**
   - The `printReport()` function will print out a report of all the crawled pages.

## Example of Crawling

If you run the command:

```bash
npm start https://example.com
```

The program will crawl the website starting from `https://example.com` and extract all internal links. If the site contains pages like:

- https://example.com/page1
- https://example.com/page2
- https://example.com/page1/extra

It will visit those pages and extract the URLs from them as well.

## Error Handling

- **Invalid URL:** If the provided URL is not valid or there is an issue fetching the page, the program logs an error message and skips that URL.
- **External Links:** External links (i.e., links to domains not matching the base URL's domain) are ignored.
- **Non-HTML Pages:** Non-HTML content, such as images, PDFs, etc., will be skipped.
- **Fetching Errors:** If there are any errors during fetching (e.g., server not reachable), they are caught and logged.

## Example Output

After crawling, the program will log each page being actively crawled. It will also report pages like:

```
Starting crawl of https://example.com
Actively crawling: https://example.com
Actively crawling: https://example.com/page1
Actively crawling: https://example.com/page2
...
```

### Sample Error Logs:
- If an error occurs during fetching:
  ```
  Error in fetch: NetworkError when attempting to fetch resource, on page https://example.com
  ```
- If a page is not HTML:
  ```
  no html response, content type: application/pdf, on page https://example.com/file.pdf
  ```

## Contributing

This project is intendend for educational purposes. However, if you have suggestions on how to make the project better, feel free to reach out and give me suggestions.

## License

This project is licensed under the MIT License.