// A hand-written stub for testing the display (TRANSLATIONS_PLAN.md §7, Phase 1).  The importer
// (Phases 2–4) replaces it with the whole of English, generated from Divinum Officium.
// It covers Sunday's psalms and the Nunc dimittis, and the chants and prayers of an ordinary
// Sunday after Pentecost with no priest.  Everything else is left out, to show the fallback.
//
// Most of the text is from Divinum Officium (https://github.com/DivinumOfficium/divinum-officium),
// Copyright (c) 2026 Divinum Officium, MIT licence (js/i18n/LICENSE-divinum-officium.txt).
define({
  meta: {name: 'English', dir: 'ltr', doCommit: 'ad87836', stub: true},
  psalter: {
    '4': [
      'When I called upon him, the God of my justice heard me: * when I was in distress, thou hast enlarged me.',
      'Have mercy on me: * and hear my prayer.',
      'O ye sons of men, how long will you be dull of heart? * Why do you love vanity, and seek after lying?',
      'Know ye also that the Lord hath made his holy one wonderful: * the Lord will hear me when I shall cry unto him.',
      'Be ye angry, and sin not: † the things you say in your hearts, * be sorry for them upon your beds.',
      'Offer up the sacrifice of justice, † and trust in the Lord: * many say, Who sheweth us good things?',
      'The light of thy countenance, O Lord, is signed upon us: * thou hast given gladness in my heart.',
      'By the fruit of their corn, their wine, and oil, * they are multiplied.',
      'In peace in the selfsame * I will sleep, and I will rest:',
      'For thou, O Lord, singularly * hast settled me in hope.',
      'Glory be to the Father, and to the Son, * and to the Holy Ghost.',
      'As it was in the beginning, is now, * and ever shall be, world without end. Amen.'
    ],
    '90': [
      'He that dwelleth in the aid of the most High, * shall abide under the protection of the God of Jacob.',
      'He shall say to the Lord: Thou art my protector, and my refuge: * my God, in him will I trust.',
      'For he hath delivered me from the snare of the hunters: * and from the sharp word.',
      'He will overshadow thee with his shoulders: * and under his wings thou shalt trust.',
      'His truth shall compass thee with a shield: * thou shalt not be afraid of the terror of the night.',
      'Of the arrow that flieth in the day, † of the business that walketh about in the dark: * of invasion, or of the noonday devil.',
      'A thousand shall fall at thy side, † and ten thousand at thy right hand: * but it shall not come nigh thee.',
      'But thou shalt consider with thy eyes: * and shalt see the reward of the wicked.',
      'Because thou, O Lord, art my hope: * thou hast made the most High thy refuge.',
      'There shall no evil come to thee: * nor shall the scourge come near thy dwelling.',
      'For he hath given his angels charge over thee; * to keep thee in all thy ways.',
      'In their hands they shall bear thee up: * lest thou dash thy foot against a stone.',
      'Thou shalt walk upon the asp and the basilisk: * and thou shalt trample under foot the lion and the dragon.',
      'Because he hoped in me I will deliver him: * I will protect him because he hath known my name.',
      'He shall cry to me, and I will hear him: † I am with him in tribulation, * I will deliver him, and I will glorify him.',
      'I will fill him with length of days; * and I will shew him my salvation.',
      'Glory be to the Father, and to the Son, * and to the Holy Ghost.',
      'As it was in the beginning, is now, * and ever shall be, world without end. Amen.'
    ],
    '133': [
      'Behold now bless ye the Lord, * all ye servants of the Lord:',
      'Who stand in the house of the Lord, * in the courts of the house of our God.',
      'In the nights lift up your hands to the holy places, * and bless ye the Lord.',
      'May the Lord out of Sion bless thee, * he that made heaven and earth.',
      'Glory be to the Father, and to the Son, * and to the Holy Ghost.',
      'As it was in the beginning, is now, * and ever shall be, world without end. Amen.'
    ],
    'nunc-dimittis': [
      'Now thou dost dismiss thy servant, O Lord, * according to thy word in peace;',
      'Because my eyes have seen * thy salvation,',
      'Which thou hast prepared * before the face of all peoples:',
      'A light to the revelation of the Gentiles, * and the glory of thy people Israel.',
      'Glory be to the Father, and to the Son, * and to the Holy Ghost.',
      'As it was in the beginning, is now, * and ever shall be, world without end. Amen.'
    ]
  },
  texts: {
    'jube-domine.gabc': ['V. Grant, Lord, a blessing.'],
    'blessing.gabc': ['May almighty God grant us a quiet night and a perfect end.\nR. Amen.'],
    'lesson.gabc': [
      'Brothers: Be sober and watch: because your adversary the devil, as a roaring lion, goeth about seeking whom he may devour. Whom resist ye, strong in faith. But thou, O Lord, have mercy upon us.',
      'R. Thanks be to God.'
    ],
    'adjutorium-nostrum.gabc': ['V. Our help is in the name of the Lord,', 'R. Who made heaven and earth.'],
    'converte-nos.gabc': ['V. Turn us then, O God, our saviour:', 'R. And let thy anger cease from us.'],
    'deus-in-adjutorium_alleluia.gabc': [
      'V. O God, come to my assistance;',
      'R. O Lord, make haste to help me.',
      'Glory be to the Father, and to the Son, * and to the Holy Ghost.\nAs it was in the beginning, is now, * and ever shall be, world without end. Amen. Alleluia.'
    ],
    'psalms/0/ant.gabc': ['Have mercy on me, O Lord, and hear my prayer.'],
    'te-lucis/Ferial.gabc': [
      'Before the ending of the day,\nCreator of the world, we pray\nThat with thy wonted favor thou\nWouldst be our guard and keeper now.',
      'From all ill dreams defend our eyes,\nFrom nightly fears and fantasies;\nTread under foot our ghostly foe,\nThat no pollution we may know.',
      'O Father, that we ask be done,\nThrough Jesus Christ, thine only Son;\nWho, with the Holy Ghost and thee,\nDoth live and reign eternally.\nAmen.'
    ],
    'chapter.gabc': ['But thou, O Lord, art among us, and thy name is called upon by us: forsake us not, O Lord our God.\nR. Thanks be to God.'],
    'in-manus-tuas/ordinary_full.gabc': [
      'Into thy hands, O Lord, * I commend my spirit.\nR. Into thy hands…',
      'V. Thou hast redeemed us, O Lord, God of truth.\nR. I commend my spirit.',
      'V. Glory be to the Father, and to the Son, and to the Holy Ghost.\nR. Into thy hands, O Lord, * I commend my spirit.'
    ],
    'custodi-nos.gabc': ['V. Keep us, Lord, as the apple of thine eye.\nR. Protect us under the shadow of thy wings.'],
    'canticle-ant.gabc': ['Protect us, Lord, while we are awake and safeguard us while we sleep; that we may keep watch with Christ, and rest in peace.'],
    'prayer.gabc': ['Let us pray.\nVisit, we beseech thee, O Lord, this dwelling, and drive far from it the snares of the enemy; let thy holy angels dwell herein to preserve us in peace, and let thy blessing be always upon us.\nThrough Jesus Christ, thy Son our Lord, Who liveth and reigneth with thee, in the unity of the Holy Ghost, God, world without end.\nR. Amen.'],
    'benedicamus-domino.gabc': ['V. Let us bless the Lord.\nR. Thanks be to God.'],
    'marian-antiphon/salve-regina.gabc': ['Hail holy Queen, Mother of Mercy, our life, our sweetness, and our hope. To thee do we cry, poor banished children of Eve. To thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious Advocate, thine eyes of mercy toward us. And after this our exile show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary.'],
    'marian-antiphon/salve-prayer.gabc': ['Let us pray.\nO almighty, everlasting God, who by the cooperation of the Holy Spirit, didst prepare the body and soul of Mary, glorious Virgin and Mother, to become a worthy dwelling for Thy Son; grant that we who rejoice in her commemoration may, by her gracious intercession, be delivered from present evils and from everlasting death. Through the same Christ our Lord.\nR. Amen.'],
    'index:confiteor': ['I confess to almighty God, to blessed Mary ever Virgin, to blessed Michael the Archangel, to blessed John the Baptist, to the holy Apostles Peter and Paul, and to all the Saints, that I have sinned exceedingly in thought, word and deed: through my fault, through my fault, through my most grievous fault. Therefore I beseech blessed Mary ever Virgin, blessed Michael the Archangel, blessed John the Baptist, the holy Apostles Peter and Paul, and all the Saints, to pray for me to the Lord our God.'],
    'index:misereatur-nostri': ['May almighty God have mercy on us, forgive us our sins, and bring us to everlasting life.\nR. Amen.'],
    'index:indulgentiam': ['May the almighty and merciful Lord grant us pardon, absolution and remission of our sins.\nR. Amen.'],
    'index:domine-exaudi': ['V. O Lord, hear my prayer.\nR. And let my cry come unto thee.'],
    'index:dominus-vobiscum': ['V. The Lord be with you.\nR. And with thy spirit.'],
    'index:benedicat': ['May the almighty and merciful Lord, the Father, and the Son, and the Holy Ghost, bless and keep us.\nR. Amen.'],
    'index:marian-salve-versicle': ['V. Pray for us, O Holy Mother of God.\nR. That we may be made worthy of the promises of Christ.'],
    'index:divinum-auxilium': ['V. May the divine assistance remain with us always.\nR. Amen.']
  }
});
