/**
 * Extracts the domain of a URL from the link.
 * @param link - the link to process
 * @returns domain - the domain of the URL, as a string
 */
export const extractDomain = (link: string) => {
  let link_split = link.split("/");
  let domain = link_split[2];
  if (domain) {
    let prefix = domain.split(".");
    if (prefix[0].toLowerCase() === "www") {
      prefix.shift();
    }
    domain = prefix.join(".");
  }

  return domain;
};

/**
 * Adds a https:// prefix to the link if necessary
 * @param link - the link to process
 * @returns the reformatted URL
 */
export const validateLinkPrefix = (link: string) => {
  let newUrl = window.decodeURIComponent(link);
  newUrl = newUrl.trim().replace(/\s/g, "");

  if (/^(:\/\/)/.test(newUrl)) {
    return `https${newUrl}`;
  }
  if (!/^https?:\/\//i.test(newUrl)) {
    return `https://${newUrl}`;
  }

  return newUrl;
};
