import { generateCard, getData, Type, noResultsFound } from './util.js';

const talents = await getData(Type.Talent);

const talentContainer = $('.card-container');
const noResultsContainer = $('.noresults-container');

const allTalents = [];
for (const nation in talents) {
    allTalents.push(...talents[nation].talents);
}

talentContainer.empty().append(allTalents.map((talent) => generateCard(talent)));

$('select').on('change', () => {
    const gen = parseInt($('select#generation').val());
    const nation = $('select#nationality').val();
    const listTalents = nation === 'all' ? allTalents : talents[nation]?.talents;
    const filteredTalent = listTalents?.filter((talent) => gen === 0 || talent.gen === gen);
    talentContainer.empty();
    noResultsContainer.empty();
    if (!filteredTalent || filteredTalent.length === 0) return noResultsContainer.append(noResultsFound());
    talentContainer.append(filteredTalent.map((talent) => generateCard(talent)));
});
