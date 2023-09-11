const fs = require('fs');
const path = require('path');
const grayMatter = require('gray-matter');
const dayjs = require('dayjs');

module.exports = function(context) {
    const DOCS_DIR = path.join(context.siteDir, 'docs');

    function getMarkdownFiles(dir) {
        let results = [];
        const list = fs.readdirSync(dir);
        list.forEach(file => {
            file = path.join(dir, file);
            const stat = fs.statSync(file);
            if (stat && stat.isDirectory()) {
                results = results.concat(getMarkdownFiles(file)); /* Recurse into a subdirectory */
            } else {
                if (path.extname(file) === '.md' || path.extname(file) === '.mdx') {
                    results.push(file);
                }
            }
        });
        return results;
    }

    return {
        name: 'docusaurus-plugin-sidebar-tags',
        loadContent() {
            const markdownFiles = getMarkdownFiles(DOCS_DIR);
            let pluginData = {};

            markdownFiles.forEach(filePath => {
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                const { data } = grayMatter(fileContent);

                const fileStats = fs.statSync(filePath);
                const lastUpdatedDate = fileStats.mtime; // Last modified time
                const createdDate = fileStats.birthtime; // Creation time

                if (!data) return;

                // Determine docId
                let relativePath = path.relative(DOCS_DIR, filePath); // Get the path relative to the docs directory
                let docId = relativePath.replace(/\.[^/.]+$/, ""); // Remove the file extension

                if (data.id) { // If custom id is provided in the front matter
                    const parts = docId.split("/");
                    parts[parts.length - 1] = data.id; // Replace the last part of the path
                    docId = parts.join("/");
                }

                // Check for lastUpdatedDate and createdDate
                if (dayjs().diff(dayjs(lastUpdatedDate), 'day') <= 7) {
                    pluginData[docId] = {
                        ...pluginData[docId],
                        tag: 'Updated'
                    };
                } else if (dayjs().diff(dayjs(createdDate), 'day') <= 7) {
                    pluginData[docId] = {
                        ...pluginData[docId],
                        tag: 'New'
                    };
                }

                // Check for sidebar_tag yaml property
                if (data.sidebar_tag) {
                    pluginData[docId] = {
                        tag: data.sidebar_tag
                    };
                }
            });

            return pluginData;

        },
        contentLoaded({ content, actions }) {
            actions.setGlobalData(content);
        },
        getThemePath() {
            return __dirname + '/theme';
        }
    };
}