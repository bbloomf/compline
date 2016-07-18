define(['moment','moment.easter'], function(moment){
'use strict';
//from https://en.wikipedia.org/wiki/General_Roman_Calendar_of_1960
//rank:5 is commemoration
  var romanCalendar = [
    {//January
      "1": {title:"Octave of the Nativity of the Lord", rank:1},
      "5": {title:"Commemoration of St. Telesphorus Pope and Martyr", rank:5},
      "6": {title:"On the Epiphany of the Lord", rank:1},
      "11": {title:"Commemoration of St. Hyginus Pope and Martyr", rank:5},
      "13": {title:"On the Commemoration of the Baptism of our Lord Jesus Christ", rank:2},
      "14": {title:"St. Hilary Bishop, Confessor, and Doctor of the Church", rank:3, com:"St. Felix Priest and Martyr"},
      "15": {title:"St. Paul first hermit, Confessor", rank:3, com:"St. Maurus Abbot"},
      "16": {title:"St. Marcellus I Pope and Martyr", rank:3},
      "17": {title:"St. Anthony Abbot", rank:3},
      "18": {title:"Commemoration of St. Prisca Virgin and Martyr", rank:5},
      "19": {title:"Commemoration of Ss. Marius, Martha, Audifax, and Abachum Martyrs", rank:5, com:"St. Canute, Martyr"},
      "20": {title:"Ss. Fabian Pope and Sebastian Martyrs", rank:3},
      "21": {title:"St. Agnes, Virgin and Martyr", rank:3},
      "22": {title:"Ss. Vincent and Anastasius Martyrs", rank:3},
      "23": {title:"St. Raymund of Peñafort Confessor", rank:3, com:"St. Emerentiana Virgin and Martyr"},
      "24": {title:"St. Timothy Bishop and Martyr", rank:3},
      "25": {title:"On the Conversion of St. Paul Apostle", rank:3, com:"St. Peter Apostle"},
      "26": {title:"St. Polycarp Bishop and Martyr", rank:3},
      "27": {title:"St. John Chrysostom Bishop, Confessor, and Doctor of the Church", rank:3},
      "28": {title:"St. Peter Nolasco Confessor", rank:3, com:"St. Agnes, Virgin and Martyr second"},
      "29": {title:"St. Francis de Sales Bishop, Confessor, and Doctor of the Church", rank:3},
      "30": {title:"St. Martina Virgin and Martyr", rank:3},
      "31": {title:"St. John Bosco Confessor", rank:3}
    },

    {//February
      "1": {title:"St. Ignatius Bishop and Martyr", rank:3},
      "2": {title:"On the Purification of the Blessed Virgin Mary", rank:2},
      "3": {title:"Commemoration of St. Blase Bishop and Martyr", rank:5},
      "4": {title:"St. Andrew Corsini Bishop and Confessor", rank:3},
      "5": {title:"St. Agatha Virgin and Martyr", rank:3},
      "6": {title:"St. Titus Bishop and Confessor", rank:3, com:"St. Dorothy Virgin and Martyr"},
      "7": {title:"St. Romuald Abbot", rank:3},
      "8": {title:"St. John of Matha Confessor", rank:3},
      "9": {title:"St. Cyril Bishop of Alexandria, Confessor, and Doctor of the Church", rank:3, com:"St. Apollonia Virgin and Martyr"},
      "10": {title:"St. Scholastica Virgin", rank:3},
      "11": {title:"On the Apparition of the Blessed Virgin Mary Immaculate", rank:3},
      "12": {title:"The Seven Holy Founders of the Order of Servants of the Blessed Virgin Mary Confessors", rank:3},
      "14": {title:"Commemoration of St. Valentine Priest and Martyr", rank:5},
      "15": {title:"Commemoration of Ss.Faustinus and Jovita Martyrs", rank:5},
      "18": {title:"Commemoration of St. Simeon Bishop and Martyr", rank:5},
      "22": {title:"Chair of St. Peter", rank:2, com:"St. Paul"},
      "23": {title:"St. Peter Damian Confessor", rank:3},
      "24": {title:"St. Matthias Apostle", rank:2, plusOne:"ifLeapYear"},
      "27": {title:"St. Gabriel of Our Lady of Sorrows", rank:3, plusOne:"ifLeapYear"},
      //In leap year the month of February is of 29 days, and the feast of St. Matthias is celebrated on the 25th day and the feast of St. Gabriel of Our Lady of Sorrows on the 28th day of February, and twice is said Sexto Kalendas, that is on the 24th and 25th; and the dominical letter, which was taken up in the month of January, is changed to the preceding; that, if in January, the dominical letter was A, it is changed to the preceding, which is g, etc.; and the letter f is kept twice, on the 24th and 25th.[2]
    },

    {//March
      "4": {title:"St. Casimir Confessor", rank:3, com:"St. Lucius I Pope and Martyr"},
      "6": {title:"Ss. Perpetua and Felicity Martyrs", rank:3},
      "7": {title:"St. Thomas Aquinas Confessor and Doctor of the Church", rank:3},
      "8": {title:"St. John of God Confessor", rank:3},
      "9": {title:"St. Frances of Rome, Widow", rank:3},
      "10": {title:"The Forty Holy Martyrs", rank:3},
      "12": {title:"St. Gregory I Pope, Confessor, and Doctor of the Church", rank:3},
      "17": {title:"St. Patrick Bishop and Confessor", rank:3},
      "18 ": {title:"St.Cyril Bishop of Jerusalem, Confessor, and Doctor of the Church", rank:3},
      "19": {title:"St. Joseph, Spouse of the Blessed Virgin Mary, Confessor, and Patron of the Universal Church", rank:1},
      "21": {title:"St. Benedict Abbot", rank:3},
      "24": {title:"St. Gabriel the Archangel", rank:3},
      "25": {title:"Annunciation of the Blessed Virgin Mary", rank:1},
      "27": {title:"St. John Damascene Confessor and Doctor of the Church", rank:3},
      "28": {title:"St. John Capistran Confessor", rank:3}
    },

    {//April
      "2": {title:"St. Francis of Paula Confessor", rank:3},
      "4": {title:"St. Isidore Bishop, Confessor, and Doctor of the Church", rank:3},
      "5": {title:"St. Vincent Ferrer Confessor", rank:3},
      "11": {title:"St. Leo I Pope, Confessor, and Doctor of the Church", rank:3},
      "13": {title:"St. Hermenegild Martyr", rank:3},
      "14": {title:"St. Justin", rank:3, com:"Saints Tiburtius, Valerian and Maximus Martyrs"},
      "17": {title:"Commemoration of St. Anicetus Pope and Martyr", rank:5},
      "21": {title:"St. Anselm Bishop, Confessor, and Doctor of the Church", rank:3},
      "22": {title:"Ss. Soter and Cajus Popes and Martyrs", rank:3},
      "23": {title:"Commemoration of St. George Martyr", rank:5},
      "24": {title:"St. Fidelis of Sigmaringen Martyr", rank:3},
      "25": {title:"Greater Litany. - St. Mark Evangelist", rank:2},
      "26": {title:"Ss. Cletus and Marcellinus Popes and Martyrs", rank:3},
      "27": {title:"St. Peter Canisius Confessor and Doctor of the Church", rank:3},
      "28": {title:"St. Paul of the Cross Confessor", rank:3},
      "29": {title:"St. Peter Martyr", rank:3},
      "30": {title:"St. Catherine of Siena Virgin", rank:3}
    },

    {//May
      "1": {title:"St. Joseph the Workman, Spouse of the Blessed Virgin Mary, Confessor", rank:1},
      "2": {title:"St. Athanasius, Bishop, Confessor, and Doctor of the Church", rank:3},
      "3": {title:"Commemoration of Ss. Alexander, Eventius and Theodulus Martyrs, and Juvenal, Bishop and Confessor", rank:5},
      "4": {title:"St. Monica, Widow", rank:3},
      "5": {title:"St. Pius V Pope and Confessor", rank:3},
      "7": {title:"St. Stanislaus Bishop and Martyr", rank:3},
      "9": {title:"St. Gregory Nazianzen Bishop, Confessor, and Doctor of the Church", rank:3},
      "10": {title:"St. Antoninus Bishop and Confessor", rank:3, com:"Ss. Gordian and Epimachus"},
      "11": {title:"Ss. Philip and James Apostles", rank:2},
      "12": {title:"Ss. Nereus, Achilleus, Domitilla Virgin, and Pancras Martyrs", rank:3},
      "13": {title:"St. Robert Bellarmine Bishop, Confessor, and Doctor of the Church", rank:3},
      "14": {title:"Commemoration of St. Boniface Martyr", rank:5},
      "15": {title:"St. John Baptist de la Salle Confessor", rank:3},
      "16": {title:"St. Ubald Bishop and Confessor", rank:3},
      "17": {title:"St. Paschal Baylon Confessor", rank:3},
      "18": {title:"St. Venantius Martyr", rank:3},
      "19": {title:"St. Peter Celestine Pope and Confessor", rank:3, com:"St. Pudentiana Virgin"},
      "20": {title:"St. Bernardine of Siena Confessor", rank:3},
      "25": {title:"St. Gregory VII Pope and Confessor", rank:3, com:"St. Urban I Pope and Martyr"},
      "26": {title:"St. Philip Neri Confessor", rank:3, com:"St. Eleutherius Pope and Martyr"},
      "27": {title:"St. Bede the Venerable Confessor and Doctor of the Church", rank:3, com:"St. John I Pope and Martyr"},
      "28": {title:"St. Augustine Bishop and Confessor", rank:3},
      "29": {title:"St. Mary Magdalen de Pazzi Virgin", rank:3},
      "30": {title:"Commemoration of St. Felix I Pope and Martyr", rank:5},
      "31": {title:"Blessed Virgin Mary, Queen", rank:2, com:"St. Petronilla Virgin"}
    },

    {//June
      "1": {title:"St. Angela Merici Virgin", rank:3},
      "2": {title:"Commemoration of Ss. Marcellinus, Peter, and Erasmus Bishop, Martyrs", rank:5},
      "4": {title:"St. Francis Caracciolo Confessor", rank:3},
      "5": {title:"St. Boniface Bishop and Martyr", rank:3},
      "6": {title:"St. Norbert Bishop and Confessor", rank:3},
      "9": {title:"Commemoration of Ss. Primus and Felician Martyrs", rank:5},
      "10": {title:"St. Margaret Queen, Widow", rank:3},
      "11": {title:"St. Barnabas Apostle", rank:3},
      "12": {title:"St. John of San Facundo Confessor", rank:3, com:"Ss. Basilides, Cyrinus, Nabor and Nazarius Martyrs"},
      "13": {title:"St. Anthony of Padua Confessor", rank:3},
      "14": {title:"St. Basil the Great Bishop, Confessor, and Doctor of the Church", rank:3},
      "15": {title:"Commemoration of Ss. Vitus, Modestus, and Crescentia Martyrs", rank:5},
      "17": {title:"St. Gregory Barbarigo Bishop and Confessor", rank:3},
      "18": {title:"St. Ephraem Syrus Deacon, Confessor, and Doctor of the Church", rank:3, com:"Ss. Mark and Marcellianus Martyrs"},
      "19": {title:"St. Juliana Falconieri Virgin", rank:3, com:"Ss. Gervase and Protase Martyrs"},
      "20": {title:"Commemoration of St. Silverius Pope and Martyr", rank:5},
      "21": {title:"St. Aloysius Gonzaga Confessor", rank:3},
      "22": {title:"St. Paulinus Bishop and Confessor", rank:3},
      "23": {title:"Vigil", rank:2},
      "24": {title:"On the Nativity of St. John the Baptist", rank:1},
      "25": {title:"St. William Abbot", rank:3},
      "26": {title:"Ss. John and Paul Martyrs", rank:3},
      "28": {title:"Vigil", rank:2},
      "29": {title:"Ss. Peter and Paul Apostles", rank:1},
      "30": {title:"On the Commemoration of St. Paul Apostle", rank:3, com:"St. Peter Apostle"}
    },

    {//July
      "1": {title:"The Most Precious Blood of our Lord Jesus Christ", rank:1},
      "2": {title:"On the Visitation of the Blessed Virgin Mary", rank:2, com:"Ss. Processus and Martinian Martyrs"},
      "3": {title:"St. Irenaeus Bishop and Martyr", rank:3},
      "5": {title:"St. Anthony Mary Zaccaria Confessor", rank:3},
      "7": {title:"Ss. Cyril and Methodius Bishops and Confessors", rank:3},
      "8": {title:"St. Elizabeth Queen, Widow", rank:3},
      "10": {title:"The Seven Holy Brothers Martyrs, and Ss. Rufina and Secunda Virgins and Martyrs", rank:3},
      "11": {title:"Commemoration of St. Pius I Pope and Martyr", rank:5},
      "12": {title:"St. John Gualbert Abbot", rank:3, com:"Ss. Nabor and Felix Martyrs"},
      "14": {title:"St. Bonaventure Bishop, Confessor, and Doctor of the Church", rank:3},
      "15": {title:"St. Henry II Emperor, Confessor", rank:3},
      "16": {title:"Commemoration of the Blessed Virgin Mary of Mt. Carmel", rank:5},
      "17": {title:"Commemoration of St. Alexius Confessor", rank:5},
      "18": {title:"St. Camillus de Lellis Confessor", rank:3, com:"St. Symphorosa and her seven Sons Martyrs"},
      "19": {title:"St. Vincent de Paul Confessor", rank:3},
      "20": {title:"St. Jerome Emiliani Confessor", rank:3, com:"St. Margaret Virgin Martyr"},
      "21": {title:"St. Lawrence of Brindisi Confessor and Doctor of the Church", rank:3, com:"St. Praxedes Virgin"},
      "22": {title:"St. Mary Magdalene Penitent", rank:3},
      "23": {title:"St. Apollinaris Martyr", rank:3, com:"St. Liborius Bishop and Confessor"},
      "24": {title:"Commemoration of St. Christina Virgin and Martyr"},
      "25": {title:"St. James Apostle", rank:2, com:"St. Christopher Martyr"},
      "26": {title:"St. Anne Mother of the Blessed Virgin Mary", rank:2},
      "27": {title:"St. Pantaleon Martyr", rank:5},
      "28": {title:"Ss. Nazarius and Celsus Martyrs, Victor I Pope and Martyr, and St. Innocent I Pope and Confessor", rank:3},
      "29": {title:"St. Martha Virgin", rank:3, com:"Ss. Felix, Simplicius, Faustinus, and Beatrice Martyrs"},
      "30": {title:"Commemoration of Ss. Abdon and Sennen Martyrs", rank:5},
      "31": {title:"St. Ignatius Confessor", rank:3}
    },

    {//August
      "1": {title:"Commemoration of the Holy Machabees Martyrs", rank:5},
      "2": {title:"St. Alphonsus Mary of Liguori Bishop, Confessor, and Doctor of the Church", rank:3, com:"St. Stephen I Pope and Martyr"},
      "4": {title:"St. Dominic Confessor, Greater", rank:3},
      "5": {title:"On the Dedication of Our Lady of the Snows", rank:3, ol:1},
      "6": {title:"On the Transfiguration of our Lord Jesus Christ", rank:2, com:"Ss. Xystus II Pope, Felicissimus, and Agapitus Martyrs"},
      "7": {title:"St. Cajetan Confessor", rank:3, com:"St. Donatus Bishop and Martyr"},
      "8": {title:"St. John Mary Vianney Confessor and Priest", rank:3, com:"Ss. Cyriacus, Largus, and Smaragdus Martyrs"},
      "9": {title:"Vigil", rank:3, com:"St. Romanus Martyr"},
      "10": {title:"St. Laurence Martyr", rank:2},
      "11": {title:"Commemoration of Ss. Tiburtius and Susanna Virgin, Martyrs", rank:5},
      "12": {title:"St. Clare Virgin", rank:3},
      "13": {title:"Commemoration of Ss. Hippolytus and Cassian Martyrs", rank:5},
      "14": {title:"Vigil", rank:2, com:"St. Eusebius Confessor"},
      "15": {title:"On the Assumption of the Blessed Virgin Mary", rank:1},
      "16": {title:"St. Joachim Father of the Blessed Virgin Mary, Confessor", rank:2},
      "17": {title:"St. Hyacinth of Poland Confessor", rank:3},
      "18": {title:"Commemoration of St. Agapitus Martyr", rank:5},
      "19": {title:"St. John Eudes Confessor", rank:3},
      "20": {title:"St. Bernard Abbot and Doctor of the Church", rank:3},
      "21": {title:"St. Jane Frances de Chantal, Widow", rank:3},
      "22": {title:"Immaculate Heart of the Blessed Virgin Mary", rank:2, com:"Ss. Timothy and Companions Martyrs"},
      "23": {title:"St. Philip Benizi Confessor", rank:3},
      "24": {title:"St. Bartholomew Apostle", rank:2},
      "25": {title:"St. Louis King, Confessor", rank:3},
      "26": {title:"Commemoration of St. Zephyrinus Pope Martyr", rank:5},
      "27": {title:"St. Joseph Calasanctius Confessor", rank:3},
      "28": {title:"St. Augustine Bishop, Confessor, and Doctor of the Church", rank:3, com:"St. Hermes Martyr"},
      "29": {title:"On the Beheading of St. John the Baptist", rank:3, com:"St. Sabina Martyr"},
      "30": {title:"St. Rose of Lima Virgin", rank:3, com:"Ss. Felix and Adauctus Martyrs"},
      "31": {title:"St. Raymond Nonnatus Confessor", rank:3}
    },

    {//September
      "1": {title:"Commemoration of St. Giles Abbot", rank:"Comm", com:"the Holy Twelve Brothers Martyrs"},
      "2": {title:"St. Stephen King, Confessor", rank:3},
      "3": {title:"St. Pius X Pope and Confessor", rank:3},
      "5": {title:"St. Laurence Justinian Bishop and Confessor", rank:3},
      "8": {title:"On the Nativity of the Blessed Virgin Mary", rank:2, com:"St. Hadrian Martyr"},
      "9": {title:"Commemoration of St. Gorgonius Martyr", rank:5},
      "10": {title:"St. Nicholas of Tolentino Confessor", rank:3},
      "11": {title:"Commemoration of Ss. Protus and Hyacinth Martyrs", rank:5},
      "12": {title:"The Most Holy Name of Mary", rank:3},
      "14": {title:"On the Exaltation of the Holy Cross", rank:2},
      "15": {title:"Seven Sorrows of the Blessed Virgin Mary", rank:2, com:"St. Nicomedes Martyr"},
      "16": {title:"St. Cornelius Pope and St. Cyprian Bishop, Martyrs", rank:3, com:"Ss. Euphemia Virgin, Lucy and Geminianus Martyrs"},
      "17": {title:"Commemoration of the Impression of the sacred Stigmata of St. Francis Confessor", rank:5},
      "18": {title:"St. Joseph of Cupertino Confessor", rank:3},
      "19": {title:"St. Januarius Bishop and Companions Martyrs", rank:3},
      "20": {title:"Commemoration of St. Eustace and Companions Martyrs", rank:5},
      "21": {title:"St. Matthew Apostle and Evangelist", rank:2},
      "22": {title:"St. Thomas of Villanova Bishop and Confessor", rank:3, com:"Ss. Maurice and Companions Martyrs"},
      "23": {title:"St. Linus Pope and Martyr", rank:3, com:"St. Thecla Virgin and Martyr"},
      "24": {title:"Commemoration of Our Lady of Ransom", rank:5, ol:1},
      "26": {title:"Commemoration of Ss. Cyprian and Justina Virgin, Martyrs", rank:5},
      "27": {title:"Ss. Cosmas and Damian Martyrs", rank:3},
      "28": {title:"St. Wenceslaus Duke, Martyr", rank:3},
      "29": {title:"On the Dedication of St. Michael Archangel", rank:1},
      "30": {title:"St. Jerome Priest, Confessor, and Doctor of the Church", rank:3}
    },

    {//October
      "1": {title:"Commemoration of St. Remigius Bishop and Confessor", rank:5},
      "2": {title:"The Holy Guardian Angels, Greater", rank:3},
      "3": {title:"St. Teresa of the Child Jesus Virgin", rank:3},
      "4": {title:"St. Francis of Assisi Confessor", rank:3},
      "5": {title:"Commemoration of St. Placid and companions Martyrs", rank:5},
      "6": {title:"St. Bruno Confessor", rank:3},
      "7": {title:"Blessed Virgin Mary of the Rosary", rank:2, com:"St. Mark Pope and Confessor"},
      "8": {title:"St. Bridget, Widow", rank:3, com:"Ss. Sergius, Bacchus, Marcellus and Apuleius Martyrs"},
      "9": {title:"St. John Leonard Confessor", rank:3, com:"St. Denis Bishop, Rusticus Priest, and Eleutherius Martyrs"},
      "10": {title:"St. Francis Borgia Confessor", rank:3},
      "11": {title:"The Maternity of the Blessed Virgin Mary", rank:2},
      "13": {title:"St. Edward King, Confessor", rank:3},
      "14": {title:"St. Callistus I Pope and Martyr", rank:3},
      "15": {title:"St. Teresa Virgin", rank:3},
      "16": {title:"St. Hedwig, Widow", rank:3},
      "17": {title:"St. Margaret Mary Alacoque Virgin", rank:3},
      "18": {title:"St. Luke Evangelist", rank:2},
      "19": {title:"St. Peter of Alcantara Confessor", rank:3},
      "20": {title:"St. John Cantius Confessor", rank:3},
      "21": {title:"Commemoration of St. Hilarion Abbot", rank:5, com:"St. Ursula and Companions Virgins and Martyrs"},
      "23": {title:"St. Anthony Mary Claret Bishop and Confessor", rank:3},
      "24": {title:"St. Raphael Archangel", rank:3},
      "25": {title:"Commemoration of Ss. Chrysanthus and Daria Martyrs", rank:5},
      "26": {title:"Commemoration of St. Evaristus Pope and Martyr", rank:5},
      "28": {title:"Ss. Simon and Jude Apostles", rank:2}
    },

    {//November
      "1": {title:"All Saints", rank:1},
      "2": {title:"On the Commemoration of all the Faithful Departed", rank:1, plusOne:"ifSunday"},
      "4": {title:"St. Charles Bishop and Confessor", rank:3, com:"Ss. Vitalis and Agricola Martyrs"},
      "8": {title:"Commemoration of the Holy Four Crowned Martyrs", rank:5},
      "9": {title:"On the Dedication of the Archbasilica of the most Holy Saviour", rank:2, com:"St. Theodore Martyr"},
      "10": {title:"St. Andrew Avellino Confessor", rank:3, com:"Ss. Tryphon, Respicius, and Nympha Martyrs"},
      "11": {title:"St. Martin Bishop and Confessor", rank:3, com:"St. Mennas Martyr"},
      "12": {title:"St. Martin I Pope and Martyr", rank:3},
      "13": {title:"St. Didacus Confessor", rank:3},
      "14": {title:"St. Josaphat Bishop and Martyr", rank:3},
      "15": {title:"St. Albert the Great Bishop, Confessor, and Doctor of the Church", rank:3},
      "16": {title:"St. Gertrude Virgin", rank:3},
      "17": {title:"St. Gregory Thaumaturgus Bishop and Confessor", rank:3},
      "18": {title:"On the Dedication of the Basilicas of Ss. Peter and Paul", rank:3},
      "19": {title:"St. Elisabeth, Widow", rank:3, com:"St. Pontianus Pope and Martyr"},
      "20": {title:"St. Felix of Valois Confessor", rank:3},
      "21": {title:"On the Presentation of the Blessed Virgin Mary", rank:3},
      "22": {title:"St. Cecilia Virgin and Martyr", rank:3},
      "23": {title:"St. Clement I Pope and Martyr", rank:3, com:"St. Felicitas Martyr"},
      "24": {title:"St. John of the Cross Confessor and Doctor of the Church", rank:3, com:"St. Chrysogonus Martyr"},
      "25": {title:"St. Catherine Virgin and Martyr", rank:3},
      "26": {title:"St. Sylvester Abbot", rank:3, com:"St. Peter of Alexandria Bishop and Martyr"},
      "29": {title:"Commemoration of St. Saturninus", rank:5},
      "30": {title:"St. Andrew Apostle", rank:2}
    },

    {//December
      "2": {title:"St. Bibiana Virgin and Martyr", rank:3},
      "3": {title:"St. Francis Xavier Confessor", rank:3},
      "4": {title:"St. Peter Chrysologus Bishop, Confessor, and Doctor of the Church", rank:3, com:"St. Barbara Virgin and Martyr"},
      "5": {title:"Commemoration of St. Sabbas Abbot", rank:5},
      "6": {title:"St. Nicholas Bishop and Confessor", rank:3},
      "7": {title:"St. Ambrose Bishop, Confessor, and Doctor of the Church", rank:3},
      "8": {title:"On the Immaculate Conception of the Blessed Virgin Mary", rank:1},
      "10": {title:"Commemoration of St. Melchiades Pope and Martyr", rank:5},
      "11": {title:"St. Damasus I Pope and Confessor", rank:3},
      "13": {title:"St. Lucy Virgin and Martyr", rank:3},
      "16": {title:"St. Eusebius Bishop and Martyr", rank:3},
      "21": {title:"St. Thomas Apostle", rank:2},
      "24": {title:"Vigil", rank:1},
      "25": {title:"On the Nativity of our Lord Jesus Christ", rank:1, com:"St. Anastasia Martyr"},
      "26": {title:"St. Stephen Protomartyr", rank:2},
      "27": {title:"St. John Apostle and Evangelist", rank:2},
      "28": {title:"The Holy Innocents", rank:2},
      "29": {title:"Of the V day within the octave of the Nativity of the Lord", rank:2, com:"St. Thomas Bishop and Martyr"},
      "30": {title:"Of the VI day within the Octave of the Nativity", rank:2},
      "31": {title:"Of the VII day within the Octave of the Nativity", rank:2, com:"St. Sylvester I Pope and Confessor"}
    }
  ];
///Sunday between 01/01 and 01/06, or, with this lacking, 2 January:: The most holy Name of Jesus, II class
///I Sunday after 01/06: The most holy Family of Jesus, Mary, Joseph, II class

///"Friday after the I Sunday in Passiontide": Commemoration of the Seven Sorrows of the Blessed Virgin Mary, Comm

///"Last Sunday in October": Our Lord Jesus Christ the King, I class
  var weeksBetween = function(a,b) {
    if(typeof(a)=='string') {
      a = momentFromString(a,b);
    }
    return Math.round(moment.duration(b - a).asDays())/7;
  };
  var SundayFeast = function(SundayObject,date,dates) {
    if(SundayObject.feast) return SundayObject.feast;
    return {
      title: SundayObject.title.replace(/%([a-z])/g, function(match,callback) {
        return SundayObject[callback](date,dates);
      }),
      rank: SundayObject.rank || 2
    };
  };
  var CalendarSundays = [
    { on: '01/01', feast: romanCalendar[0][1] },
    { before: '01/06', title: 'The Most Holy Name of Jesus'},
    { on: '01/06', feast: romanCalendar[0][6] },
    { before: 'septuagesima', title: '%n. Sunday after Epiphany', n: function(date,dates) {return Math.ceil(weeksBetween('epiphany', date)); }},
    { before: 'lent1', title: '%t', t: function(date,dates) {return (['Septua','Sexa','Quinqua'])[weeksBetween('septuagesima', date)]+'gesima'; }},
    { before: 'easter', title: '%t', t: function(date, dates) {
        var weeksSinceLent1 = weeksBetween('lent1', date);
        switch(weeksSinceLent1) {
          case 0:
          case 1:
          case 2:
          case 3: return (weeksSinceLent1+1) + '. Sunday of Lent';
          case 4: return 'Passion Sunday';
          case 5: return 'Palm Sunday';
        }
      }
    },
    { on: 'easter', title: 'Easter Sunday', rank: 1 },
    { before: 'ascension', title: '%n. Sunday after Easter', n: function(date,dates) { return weeksBetween('easter', date); }},
    { on: 'pentecost', title: 'Pentecost', rank: 1 },
    { before: 'pentecost', title: 'Sunday After the Ascension'},
    { before: 'advent1', title: '%t', t: function(date,dates) {
      var weeksSincePentecost = weeksBetween('pentecost', date);
      if(weeksSincePentecost === 1) return 'Trinity Sunday';
      var weeksSinceLastWeekOfOctober = weeksBetween('10/25',date);
      if(weeksSinceLastWeekOfOctober>=0 && weeksSinceLastWeekOfOctober<1) return 'Our Lord Jesus Christ the King';
      return weeksSincePentecost + '. Sunday after Pentecost';
    }},
    { before: '12/25', title: '%n. Sunday of Advent', rank: 1, n: function(date,dates) { return weeksBetween('advent1', date) + 1; }},
    { on: '12/25', feast: romanCalendar[11][25]},
    { after: '12/25', title: 'Sunday within the Octave of Christmas'}
  ];

  var firstClassSundays = [
    "advent1","advent1+7","advent1+14","advent1+21",
    "lent1","lent1+7","lent1+14","lent1+21","lent1+28","lent1+35",
    "easter","easter+7","pentecost"
  ];

  romanCalendar.regionCodeMap = {
    "US": "United States",
    "CA": "Canada",
    "GB-ENG": "England",
    "GB-SCT": "Scotland",
    "GB-WLS": "Wales",
    "AU": "Australia and New Zealand",
    "NZ": "Australia and New Zealand"
  };

  // regional calendars:
  var regionalCalendars = {
    "United States": {
      "12/08": {title:"On the Immaculate Conception of the Blessed Virgin Mary, Principal Patroness of the United States", rank:1},
      "12/12": {title:"Our Lady of Guadalupe, Patroness of the Americas", rank:3, ol:1},
      "01/04": {title:"St. Elizabeth Ann Seton, Widow", rank:3},
      "01/22": {title:"Votive Mass for Peace", rank:2, plusOne:"ifSunday"},
      "09/09": {title:"St. Peter Claver Confessor", rank:3, com:"St. Gorgonius Martyr"},
      "09/26": {title:"Ss. Jean, Isaac and Companions Martyrs", rank:3, com:"Ss. Cyprian and Justina, Virgin, Martyrs"},
      "10/25": {title:"St. Isidore Farmer and Confessor", rank:3, com:"Ss. Chrysanthus and Daria Martyrs"},
      "11/13": {title:"St. Frances Xavier Cabrini Virgin", rank:3, com:"St. Didacus Confessor"},
    },
    "Australia and New Zealand": {
      "12/03": {title:"St. Francis Xavier Confessor, Principal Patron of All Missions", rank:1},
      "02/01": {title:"St. Brigid Virgin", rank:2, com:"St. Ignatius Bishop and Martyr"},
      "03/17": {title:"St. Patrick Bishop and Confessor", rank:1},
      "04/28": {title:"St. Peter Aloysius Mary Chanel Martyr", rank:3, com:"St. Paul of the Cross Confessor"},
      "05/24": {title:"Our Lady, Help of Christians, Principal Patroness of Australia and New Zealand", rank:1, ol:1},
      "06/09": {title:"St. Columba Abbot", rank:3, com:"Ss. Primus and Felician Martyrs"},
      "07/11": {title:"St. Oliver Plunkett Bishop and Martyr", rank:3, com:"St. Pius I Pope and Martyr"},
      "10/03": {title:"St. Teresa, Virgin, Principal Patroness of All Missions", rank:1}
    },
    "Canada": {
      "12/12": {title:"Our Lady of Guadalupe, Patroness of the Americas", rank:3, ol:1},
      "03/19": {title:"St. Joseph, Spouse of the Blessed Virgin Mary and Confessor, Principal Patron of Canada", rank:1},
      "09/26": {title:"Ss. Jean, Isaac and Companions Martyrs", rank:3, com:"Ss. Cyprian and Justina Virgin, Martyrs"},
      "10/19": {title:"The North American Martyrs, Secondary Patrons of Canada", rank:2, com:"St. Peter of Alcantara Confessor"}
    },
    "England": {
      "12/29": {title:"St. Thomas Bishop and Martyr", rank:1, com:"the V day within the octave of the Nativity of the Lord"},
      "03/12": {title:"St. Gregory I Pope, Confessor and Doctor of the Church", rank:2},
      "04/23": {title:"St. George Martyr, Principal Patron of England", rank:1},
      "05/04": {title:"The Holy Martyrs of England and Wales", rank:3, com:"St. Monica, Widow"},
      "05/26": {title:"St. Augustine Bishop and Confessor", rank:2, com:"St. Philip Neri Confessor"},
      "06/22": {title:"St. Alban Martyr", rank:3, com:"St. Paulinus Bishop and Confessor"},
      "07/09": {title:"Ss. John Fisher Bishop and Thomas More Martyrs", rank:1},
      "10/13": {title:"St. Edward King and Confessor", rank:2},
    },
    "Scotland": {
      "11/30": {title:"St. Andrew Apostle, Principal Patron of Scotland", rank:1},
      "01/14": {title:"St. Kentigern Bishop and Confessor", rank:3, com:["St. Hilary Bishop, Confessor and Doctor of the Church", "St. Felix Priest and Martyr"]},
      "03/10": {title:"St. John Ogilvie Martyr", rank:2, com:"the Forty Holy Martyrs"},
      "03/17": {title:"St. Patrick Bishop and Confessor", rank:2},
      "06/09": {title:"St. Columba Abbot", rank:3, com:"Ss. Primus and Felician Martyrs"},
      "09/16": {title:"St. Ninian Bishop and Confessor", rank:3, com:["St. Cornelius Pope and St. Cyprian Bishop, Martyrs", "Ss. Euphemia Virgin, Lucy and Geminianus Martyrs"]},
      "11/16": {title:"St. Margaret Queen, Secondary Patroness of Scotland", rank:2, com:"St. Gertrude Virgin"}
    },
    "Wales": {
      "12/29": {title:"St. Thomas Bishop and Martyr", rank:1, com:"the V day within the octave of the Nativity of the Lord"},
      "03/01": {title:"St. David Bishop and Confessor, Principal Patron of Wales", rank:1},
      "03/12": {title:"St. Gregory I Pope, Confessor and Doctor of the Church", rank:2},
      "04/23": {title:"St. George Martyr, Principal Patron of England", rank:2},
      "05/04": {title:"The Holy Martyrs of England and Wales", rank:3, com:"St. Monica, Widow"},
      "05/26": {title:"St. Augustine Bishop and Confessor", rank:2, com:"St. Philip Neri Confessor"},
      "06/22": {title:"St. Alban Martyr", rank:3, com:"St. Paulinus Bishop and Confessor"},
      "07/09": {title:"Ss. John Fisher Bishop and Thomas More Martyrs", rank:1},
      "07/17": {title:"Our Lady in Porticu", rank:3, ol:1, com:"St. Alexius Confessor"},
      "07/30": {title:"Bb. Edward Powell, Richard Featherstone and Companions Martyrs", rank:3, com:"Ss. Abdon and Sennen, Martyrs"},
      "08/03": {title:"St. Germanus Bishop and Confessor", rank:3},
      "09/25": {title:"St. Cadoc Bishop and Martyr", rank:3},
      "10/13": {title:"St. Edward King and Confessor", rank:2},
      "11/05": {title:"The Holy Relics", rank:3}
    }
  };

  var dateCache = {};
  var Dates = function(Y) {
    if(Y in dateCache) return dateCache[Y];
    this.year = Y;
    this.easter = moment.easter(Y);
    this.septuagesima = moment(this.easter).subtract(7*9,'days');
    this.lent1 = moment(this.septuagesima).add(7*3,'days');
    this.ascension = moment(this.easter).add(39,'days');
    this.pentecost = moment(this.easter).add(49,'days');
    this.christmas = moment([Y,11,25]);
    this.advent1 = moment(this.christmas).subtract((this.christmas.day() || 7) + 7*3,'days');
    this.allSouls = moment([Y,10,2]);
    if(this.allSouls.day() === 0) this.allSouls.add(1,'day');
    this.corpusChristi = moment(this.pentecost).add(11,'days');
    this.sacredHeart = moment(this.pentecost).add(19,'days');
    this.christTheKing = moment([Y,9,31]);
    this.christTheKing.subtract(this.christTheKing.day(),'days');
    this.sevenDolors = moment([Y,8,15]);
    this.epiphany = moment([Y,0,6]);
    // The Feast of the Holy Family is on the Sunday following Epiphany, unless Epiphany falls on a Sunday,
    // in which case The Holy Family will be on the Saturday following.
    this.holyFamily = moment(this.epiphany).add(7 - (this.epiphany.day()||1), 'days');
    this.transfiguration = moment([Y,7,6]);
    dateCache[Y] = this;
  };
  function getSunday(date) {
    var dates = datesForMoment(date);
    for(var i = 0; i < CalendarSundays.length; ++i) {
      var test = CalendarSundays[i];
      if(test.on) {
        if(date.isSame(momentFromString(test.on,date))) {
          return SundayFeast(test,date,dates);
        }
      } else if(test.before) {
        if(date.isBefore(momentFromString(test.before,date))) {
          return SundayFeast(test,date,dates);
        }
      } else if(test.after) {
        if(date.isAfter(momentFromString(test.after,date))) {
          return SundayFeast(test,date,dates);
        }
      }
    }
  }
  function FeriaWithAlternates(alternates,selectedAlternate) {
    if(alternates && !alternates.length) alternates = undefined;
    var feria = {title:'Feria', rank: 10};
    var result = feria;
    if(alternates && alternates.length) {
      alternates.unshift(feria);
      if(selectedAlternate) {
        result = selectedAlternate;
        _currentRegion = result.region[0];
      } else {
        _currentRegion = '';
      }
      result.alternates = alternates;
    }
    return result;
  }
  function getFeastForDate(date) {
    if('feast' in date) return date.feast;
    if(date.day() === 0) {
      return (date.feast = getSunday(date));
    }
    if(dateMatches(date,'corpusChristi')) return (date.feast = {title:'Corpus Christi', rank:1});
    if(dateMatches(date,'sacredHeart')) return (date.feast = {title:'The Most Sacred Heart of Jesus', rank:1});
    if(dateMatches(date,'ascension')) return (date.feast = {title:'The Ascension of Our Lord', rank:1});
    if(dateMatches(date,'easter-3')) return (date.feast = {title:'Maundy Thursday', rank:1});
    if(dateMatches(date,'easter-2')) return (date.feast = {title:'Good Friday', rank:1});
    if(dateMatches(date,'easter-1')) return (date.feast = {title:'Holy Saturday', rank:1});
    if(dateMatches(date,'lent1-4')) return (date.feast = {title:'Ash Wednesday', rank:5});
    var options = [];
    var selectedOption;
    if(regionalCalendars) {
      var key = date.format('MM/DD'),
          altKey = moment(date).subtract(1,'day').format('MM/DD');
      $.each(regionalCalendars, function(region, calendar){
        var option;
        if(key in calendar) {
          option = calendar[key];
        } else if(altKey in calendar) {
          var d = calendar[altKey];
          if(d.plusOne === 'ifSunday' && date.day()===1) option = d;
        }
        if(option) {
          var selectThisOption = (region === _currentRegion || romanCalendar.regionCodeMap[localStorage.region] === region);
          option.region = [region];
          var sameFeast = $.grep(options, function(o,i){
            return o.title == option.title && o.rank === option.rank;
          });
          if(sameFeast.length) {
            sameFeast[0].region.push(region);
            if(selectThisOption) selectedOption = sameFeast[0];
          } else {
            options.push(option);
            if(selectThisOption) selectedOption = option;
          }
        }
      });
    }
    if(romanCalendar) {
      var month = date.month();
      var day = date.date();
      var d = romanCalendar[month][day];
      if(!d && day > 1) {
        d = romanCalendar[month][day-1];
        if(!d || !d.plus) return (date.feast = FeriaWithAlternates(options,selectedOption));
        else if(d.plusOne === 'ifLeapYear' && !date.isLeapYear()) return (date.feast = FeriaWithAlternates(options,selectedOption));
        else if(d.plusOne === 'ifSunday' && date.day()!==1) return (date.feast = FeriaWithAlternates(options,selectedOption));
      }
      if(options.length) {
        options.unshift(d);
        if(selectedOption) {
          d = selectedOption;
          _currentRegion = d.region[0];
        } else {
          _currentRegion = '';
        }
        d.alternates = options;
      }
      if(d) return (date.feast = d);
    }
    return (date.feast = FeriaWithAlternates(options,selectedOption));
  }
  Dates.prototype.firstClassFeast = function(date) {
    var d = getFeastForDate(date);
    return !!(d && d.rank === 1);
  };
  Dates.prototype.firstOrSecondClassFeast = function(date) {
    var d = getFeastForDate(date);
    return !!(d && (d.rank === 1 || d.rank === 2));
  };
  Dates.prototype.feastOfOurLady = function(date) {
    var d = getFeastForDate(date);
    return !!(d && d.ol);
  };
  Dates.prototype.minorFeast = function(date) {
    var d = getFeastForDate(date);
    return (d && d.rank > 1 && d.rank < 5);
  };
  Dates.prototype.feria = function(date) {
    var d = getFeastForDate(date);
    if(date.day() === 0) return false;
    return !d || d.rank >= 5;
  };
  Dates.prototype.sunday = function(date) {
    return date.day() === 0;
  };
  function datesForMoment(moment) {
    return moment.Dates || (moment.Dates = new Dates(moment.year()));
  }
  Dates.prototype.isTriduum = function(date) {
    var maundyThursday = moment(this.easter).subtract(3,'days');
    return date.isSameOrAfter(maundyThursday) && date.isBefore(this.easter);
  };
  Dates.prototype.isPaschalWeek = function(date) {
    var easterSaturday = moment(this.easter).add(6,'days');
    return date.isSameOrAfter(this.easter) && date.isBefore(easterSaturday);
  };
  Dates.prototype.isPaschalTime = function(date) {
    var pentecostSaturday = moment(this.easter).add(55,'days');
    return date.isSameOrAfter(this.easter) && date.isBefore(pentecostSaturday);
  };
  Dates.prototype.isAdvent = function(date) {
    return date.isSameOrAfter(moment(this.advent1).subtract(1,'day')) && date.isSameOrBefore(moment(this.christmas).subtract(1,'day'));
  };
  function momentFromRegex(date,matches,dates) {
    if(matches[1]) {
      return moment([date.year(), parseInt(matches[2]) - 1, parseInt(matches[3])]);
    } else if(matches[5] in dates) {
      var d = dates[matches[5]]||[0];
      if(typeof d === 'function') return dates[matches[5]](date);
      var m = moment(d);
      if(matches[7]) {
        var days = parseInt(matches[7]) || 0;
        if(matches[6] == '-') {
          days *= -1;
        }
        m.add(days, 'days');
      }
      return m;
    } else {
      console.info('date not found: ' + matches[5]);
      return moment('');
    }
  }
  function momentFromString(str,date) {
    var dates = datesForMoment(date);
    //                    xxx1222222113333331x45555544466666677777444xxxxx89a
    var regexDateRange = /(?:((\d\d)\/(\d\d))|((\w+)(?:([+-])(\d+))?))(?::(((\d\d)\/(\d\d))|((\w+)(?:([+-])(\d+))?)))?/g;
    var matches = regexDateRange.exec(str);
    return momentFromRegex(date,matches,dates);
  }
  function dateMatches(date,dateRange) {
    var dates = datesForMoment(date);
    //                    111xxxx2333333224444442x56666655577777788888555xxxxx9ab
    var regexDateRange = /(!)?(?:((\d\d)\/(\d\d))|((\w+)(?:([+-])(\d+))?))(?::(((\d\d)\/(\d\d))|((\w+)(?:([+-])(\d+))?)))?/g;
    var matches;
    var test;
    while((matches = regexDateRange.exec(dateRange))) {
      var opposite = matches[1];
      var range = [momentFromRegex(date,matches.slice(1),dates)];
      if(matches[9]) {
        range.push(momentFromRegex(date,matches.slice(9),dates));
        test = date.isBetween(range[0],range[1],'day','[]');
        if(opposite) test = !test;
        if(test) return true;
      } else {
        if (typeof range[0]==='boolean') {
          if(opposite) range[0] = !range[0];
          if(range[0]) return true;
        } else {
          test = date.isSame(range[0],'day');
          if(opposite) test = !test;
          if(test) return true;
        }
      }
    }
    return false;
  }

return {
  roman: romanCalendar,
  regional: regionalCalendars,
  dateMatches: dateMatches,
  datesForMoment: datesForMoment,
  getFeastForDate: getFeastForDate
};
});