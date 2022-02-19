import { generateCard } from './util.js';

const data = await fetch('/data/talent.json');
const talents = await data.json();

const allTalents = [];
for (const nation in talents) {
    allTalents.push(...talents[nation].talents);
}

$('.card-container').empty();

$('.card-container').append(allTalents.map((talent) => generateCard(talent.name, talent.img)));

$('select').change(() => {
    const gen = parseInt($('select#generation').val());
    const nation = $('select#nationality').val();
    $('.card-container').empty();
    const listTalents = nation === 'all' ? allTalents : talents[nation].talents;
    $('.card-container').append(
        listTalents
            .filter((talent) => gen === 0 || talent.gen === gen)
            .map((talent) => generateCard(talent.name, talent.img))
    );
});
