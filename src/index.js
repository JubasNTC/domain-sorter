const { isNull } = require('lodash');
const { isEmail } = require('validator');

class DomainSorter {
  #result;
  #separator;

  constructor(separator = ':') {
    this.#result = new Map();
    this.#separator = separator;
  }

  addLines = async (lines = []) => {
    for await (const line of lines) {
      const emailPass = this.normalizeLine(line);
      if (isNull(emailPass)) return;
      const { domain, normalizedLine } = emailPass;
      const isExistDomain = this.#result.has(domain);
      if (isExistDomain) {
        this.#result.get(domain).add(normalizedLine);
      } else {
        this.#result.set(domain, new Set([normalizedLine]));
      }
    }
  };

  normalizeLine = (line) => {
    const [email, pass] = line.split(this.#separator);
    const isValidLine = isEmail(email) && !!pass;
    if (isValidLine) {
      const normalizedEmail = email.toLowerCase();
      const [, domain] = normalizedEmail.split('@');
      const normalizedLine = `${normalizedEmail}${this.#separator}${pass}`;
      return {
        domain,
        normalizedLine,
      };
    }
    return null;
  };

  getResult() {
    return this.#result;
  }

  clear() {
    this.#result.clear();
  }
}

module.exports = DomainSorter;
