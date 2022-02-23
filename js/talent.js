import { generateCard, getData, Type } from './util.js';

const talents = await getData(Type.Talent);

const talentContainer = $('.card-container');

const allTalents = [];
for (const nation in talents) {
    allTalents.push(...talents[nation].talents);
}

talentContainer.empty().append(allTalents.map((talent) => generateCard(talent)));

$('select').on('change', () => {
    const gen = parseInt($('select#generation').val());
    const nation = $('select#nationality').val();
    const listTalents = nation === 'all' ? allTalents : talents[nation].talents;
    talentContainer
        .empty()
        .append(
            listTalents
                .filter((talent) => gen === 0 || talent.gen === gen)
                .map((talent) => generateCard(talent))
        );
});
