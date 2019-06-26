export default {

	methods: {

		purifyBadWords(str = '') {
			const BAD_WORDS_REGEX = /[^ ,.?!:"'\-\n)]*(ху[е|й|и]|п[и|е|ё]зд|[е|ё]б[а|у|л]|[е|ё]б[а|о][л|ш|н]|бля[т|д]|г[о|а]ндон|з[а|о]луп|муд[а|и][к|л]|пид[а|р|о]|с(у|уч)к|др[о|а]ч|[е|ё]лда|д[а|о]лб[а|о][е|ё]б|дерьмо|хер)[^ ,.?!:"'\-\n)]*/gi;
			const WORD_EXCEPTIONS_REGEX = /\S*(потреб|псих|штрих|страх|скорб|кораб|рубл|усугуб|саб|и(сс|c)требл|сук[^а])\S*/i;
			// return str.replace(BAD_WORDS_REGEX, (match) => (match.search(WORD_EXCEPTIONS_REGEX) !== -1) ? match : '*'.repeat(match.length)) || str;
			return str;
		}
	}

}