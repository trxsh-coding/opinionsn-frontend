export default {
    methods: {
        setWordEnding(
            {
                word,
                count,
                singleLetterEnding,
                singleEnding,
                pluralEnding
            }
        ) {
            const m = count % 100;
            const n = m % 10;

            if (m % 100 === 11) {
                return word + pluralEnding
            }

            if (n === 1) {
                return word + singleLetterEnding
            } else if (n > 1 && n < 5) {
                return word + singleEnding
            } else {
                return word + pluralEnding
            }
        }
    }
}
