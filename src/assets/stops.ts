const stops = {
  '41101': {
    name: 'Mosson T1',
    coords: [3.819795, 43.61627],
  },
  '41103': {
    name: 'Halles de la Paillade',
    coords: [3.817551, 43.627565],
  },
  '41105': {
    name: 'Saint-Paul',
    coords: [3.821095, 43.630642],
  },
  '41107': {
    name: 'Hauts de Massane',
    coords: [3.822733, 43.63637],
  },
  '41109': {
    name: 'Euromédecine',
    coords: [3.827715, 43.638961],
  },
  '41111': {
    name: 'Malbosc',
    coords: [3.833184, 43.634581],
  },
  '41113': {
    name: 'Château d\'Ô',
    coords: [3.843135, 43.631618],
  },
  '41115': {
    name: 'Occitanie',
    coords: [3.848454, 43.634593],
  },
  '41117': {
    name: 'Hôpital Lapeyronie',
    coords: [3.852554, 43.63163],
  },
  '41119': {
    name: 'Universités Sciences et Lettres',
    coords: [3.861603, 43.629102],
  },
  '41121': {
    name: 'Saint-Éloi',
    coords: [3.865674, 43.626974],
  },
  '41123': {
    name: 'Boutonnet - Cité des Arts',
    coords: [3.868063, 43.622575],
  },
  '41125': {
    name: 'Stade Philippidès',
    coords: [3.869442, 43.618988],
  },
  '41127': {
    name: 'Place Albert 1er - Saint-Charles',
    coords: [3.874135, 43.61655],
  },
  '41129': {
    name: 'Louis Blanc',
    coords: [3.878133, 43.614785],
  },
  '41131': {
    name: 'Corum',
    coords: [3.881895, 43.614217],
  },
  '41133': {
    name: 'Comédie',
    coords: [3.879736, 43.608434],
  },
  '41135': {
    name: 'Gare Saint-Roch',
    coords: [3.880159, 43.605732],
  },
  '41138': {
    name: 'Du Guesclin',
    coords: [3.883291, 43.607107],
  },
  '41139': {
    name: 'Antigone',
    coords: [3.886718, 43.608574],
  },
  '41141': {
    name: 'Léon Blum',
    coords: [3.890179, 43.608878],
  },
  '41143': {
    name: 'Place de l\'Europe',
    coords: [3.893895, 43.60739],
  },
  '41145': {
    name: 'Rives du Lez',
    coords: [3.894834, 43.604208],
  },
  '41147': {
    name: 'Moularès (Hôtel de Ville)',
    coords: [3.895485, 43.600578],
  },
  '41149': {
    name: 'Port Marianne 1',
    coords: [3.899432, 43.601489],
  },
  '41151': {
    name: 'Mondial 98 1',
    coords: [3.904096, 43.602731],
  },
  '41153': {
    name: 'Millénaire 1',
    coords: [3.909979, 43.603326],
  },
  '41155': {
    name: 'Odysseum 1',
    coords: [3.92025, 43.603938],
  },
  '41161': {
    name: 'Place de France 1',
    coords: [3.915763, 43.603708],
  },
  '41163': {
    name: 'Stade de la Mosson',
    coords: [3.817386, 43.621258],
  },
  '41201': {
    name: 'Odysseum',
    coords: [3.920403, 43.603975],
  },
  '41203': {
    name: 'Millénaire',
    coords: [3.909967, 43.603411],
  },
  '41205': {
    name: 'Mondial 98',
    coords: [3.904055, 43.602814],
  },
  '41207': {
    name: 'Port Marianne',
    coords: [3.899381, 43.601566],
  },
  '41209': {
    name: 'Moularès (Hôtel de Ville)',
    coords: [3.895594, 43.600636],
  },
  '41211': {
    name: 'Rives du Lez',
    coords: [3.89496, 43.604221],
  },
  '41213': {
    name: 'Place de l\'Europe',
    coords: [3.894004, 43.607384],
  },
  '41215': {
    name: 'Léon Blum',
    coords: [3.89019, 43.608971],
  },
  '41217': {
    name: 'Antigone',
    coords: [3.886585, 43.608583],
  },
  '41218': {
    name: 'Du Guesclin',
    coords: [3.883184, 43.607132],
  },
  '41221': {
    name: 'Gare Saint-Roch',
    coords: [3.880264, 43.605749],
  },
  '41223': {
    name: 'Comédie',
    coords: [3.879839, 43.608354],
  },
  '41225': {
    name: 'Corum',
    coords: [3.881863, 43.614276],
  },
  '41227': {
    name: 'Louis Blanc',
    coords: [3.878125, 43.614696],
  },
  '41229': {
    name: 'Place Albert 1er - Saint-Charles',
    coords: [3.874064, 43.616486],
  },
  '41231': {
    name: 'Stade Philippidès',
    coords: [3.869564, 43.61899],
  },
  '41233': {
    name: 'Boutonnet - Cité des Arts',
    coords: [3.86818, 43.622605],
  },
  '41235': {
    name: 'Saint-Éloi',
    coords: [3.865762, 43.62703],
  },
  '41237': {
    name: 'Universités Sciences et Lettres',
    coords: [3.861549, 43.629181],
  },
  '41239': {
    name: 'Hôpital Lapeyronie',
    coords: [3.852635, 43.631696],
  },
  '41241': {
    name: 'Occitanie',
    coords: [3.848564, 43.634639],
  },
  '41243': {
    name: 'Château d\'Ô',
    coords: [3.843015, 43.63161],
  },
  '41245': {
    name: 'Malbosc',
    coords: [3.833249, 43.63463],
  },
  '41247': {
    name: 'Euromédecine',
    coords: [3.827676, 43.639021],
  },
  '41249': {
    name: 'Hauts de Massane',
    coords: [3.822638, 43.636369],
  },
  '41251': {
    name: 'Saint-Paul',
    coords: [3.821098, 43.630713],
  },
  '41253': {
    name: 'Halles de la Paillade',
    coords: [3.81747, 43.627567],
  },
  '41261': {
    name: 'Place de France',
    coords: [3.915734, 43.603776],
  },
  '41263': {
    name: 'Stade de la Mosson',
    coords: [3.817371, 43.621258],
  },
  '42101': {
    name: 'Saint-Jean de Védas Centre',
    coords: [3.83058, 43.574958],
  },
  '42103': {
    name: 'Saint-Jean le Sec',
    coords: [3.837917, 43.570846],
  },
  '42105': {
    name: 'La Condamine',
    coords: [3.844544, 43.571914],
  },
  '42107': {
    name: 'Victoire 2',
    coords: [3.849913, 43.575146],
  },
  '42111': {
    name: 'Sabines',
    coords: [3.860215, 43.583824],
  },
  '42113': {
    name: 'Villeneuve d\'Angoulême',
    coords: [3.865739, 43.588772],
  },
  '42115': {
    name: 'Croix d\'Argent',
    coords: [3.866507, 43.592419],
  },
  '42117': {
    name: 'Mas Drevon',
    coords: [3.867926, 43.595473],
  },
  '42119': {
    name: 'Lemasson',
    coords: [3.873068, 43.593604],
  },
  '42121': {
    name: 'Saint-Cléophas',
    coords: [3.876012, 43.594879],
  },
  '42123': {
    name: 'Nouveau Saint-Roch',
    coords: [3.875725, 43.59936],
  },
  '42125': {
    name: 'Rondelet',
    coords: [3.876046, 43.603049],
  },
  '42129': {
    name: 'Place Carnot',
    coords: [3.884209, 43.603664],
  },
  '42131': {
    name: 'Voltaire',
    coords: [3.889111, 43.603656],
  },
  '42133': {
    name: 'Rives du Lez - Consuls de Mer',
    coords: [3.893951, 43.60395],
  },
  '42137': {
    name: 'Pompignane 1',
    coords: [3.895009, 43.612575],
  },
  '42139': {
    name: 'Les Aubes 1',
    coords: [3.888234, 43.614016],
  },
  '42141': {
    name: 'Corum',
    coords: [3.881965, 43.614469],
  },
  '42143': {
    name: 'Beaux-Arts',
    coords: [3.88355341, 43.61699991],
  },
  '42145': {
    name: 'Jeu de Mail des Abbés',
    coords: [3.88409822, 43.62021045],
  },
  '42147': {
    name: 'Aiguelongue',
    coords: [3.88311015, 43.62622074],
  },
  '42149': {
    name: 'Saint-Lazare',
    coords: [3.88859098, 43.62661875],
  },
  '42151': {
    name: 'Charles de Gaulle',
    coords: [3.89771531, 43.62855518],
  },
  '42153': {
    name: 'Clairval',
    coords: [3.90259929, 43.6301927],
  },
  '42155': {
    name: 'La Galine',
    coords: [3.90903276, 43.63145689],
  },
  '42157': {
    name: 'Centurions',
    coords: [3.9157162, 43.63279798],
  },
  '42159': {
    name: 'Notre-Dame de Sablassou',
    coords: [3.9222666, 43.63423949],
  },
  '42163': {
    name: 'Aube Rouge',
    coords: [3.92493605, 43.6385425],
  },
  '42165': {
    name: 'Via Domitia',
    coords: [3.92996184, 43.64653267],
  },
  '42167': {
    name: 'Georges Pompidou',
    coords: [3.92101273, 43.64927111],
  },
  '42169': {
    name: 'Jacou',
    coords: [3.9128773, 43.65460408],
  },
  '42203': {
    name: 'Georges Pompidou',
    coords: [3.92097535, 43.64926267],
  },
  '42205': {
    name: 'Via Domitia',
    coords: [3.92989997, 43.64653358],
  },
  '42207': {
    name: 'Aube Rouge',
    coords: [3.92489868, 43.63853405],
  },
  '42211': {
    name: 'Notre-Dame de Sablassou',
    coords: [3.9222426, 43.63426681],
  },
  '42213': {
    name: 'Centurions',
    coords: [3.91570457, 43.63282512],
  },
  '42215': {
    name: 'La Galine',
    coords: [3.90902113, 43.63148403],
  },
  '42217': {
    name: 'Clairval',
    coords: [3.90258766, 43.63021983],
  },
  '42219': {
    name: 'Charles de Gaulle',
    coords: [3.89767869, 43.62857369],
  },
  '42221': {
    name: 'Saint-Lazare',
    coords: [3.88856697, 43.62664606],
  },
  '42223': {
    name: 'Aiguelongue',
    coords: [3.88309875, 43.62625687],
  },
  '42225': {
    name: 'Jeu de Mail des Abbés',
    coords: [3.88404874, 43.62021115],
  },
  '42227': {
    name: 'Beaux-Arts',
    coords: [3.88351679, 43.61701841],
  },
  '42229': {
    name: 'Corum',
    coords: [3.881992, 43.614393],
  },
  '42231': {
    name: 'Les Aubes',
    coords: [3.888226, 43.613918],
  },
  '42233': {
    name: 'Pompignane',
    coords: [3.894876, 43.612592],
  },
  '42237': {
    name: 'Rives du Lez - Consuls de Mer',
    coords: [3.893941, 43.604061],
  },
  '42239': {
    name: 'Voltaire',
    coords: [3.889099, 43.603762],
  },
  '42241': {
    name: 'Place Carnot',
    coords: [3.884326, 43.603727],
  },
  '42245': {
    name: 'Rondelet',
    coords: [3.876073, 43.603148],
  },
  '42247': {
    name: 'Nouveau Saint-Roch',
    coords: [3.875586, 43.599353],
  },
  '42249': {
    name: 'Saint-Cléophas',
    coords: [3.875883, 43.594925],
  },
  '42251': {
    name: 'Lemasson',
    coords: [3.873154, 43.593682],
  },
  '42253': {
    name: 'Mas Drevon',
    coords: [3.867803, 43.59553],
  },
  '42255': {
    name: 'Croix d\'Argent',
    coords: [3.866375, 43.592393],
  },
  '42257': {
    name: 'Villeneuve d\'Angoulême',
    coords: [3.865603, 43.588775],
  },
  '42259': {
    name: 'Sabines',
    coords: [3.860083, 43.583761],
  },
  '42263': {
    name: 'Victoire 2',
    coords: [3.849808, 43.575233],
  },
  '42265': {
    name: 'La Condamine',
    coords: [3.844418, 43.57203],
  },
  '42267': {
    name: 'Saint-Jean le Sec',
    coords: [3.837921, 43.570876],
  },
  '43101': {
    name: 'Juvignac',
    coords: [3.810112, 43.617468],
  },
  '43103': {
    name: 'Mosson T3 1',
    coords: [3.819635, 43.616231],
  },
  '43105': {
    name: 'Celleneuve 1',
    coords: [3.825937, 43.61555],
  },
  '43107': {
    name: 'Pilory 1',
    coords: [3.832084, 43.619513],
  },
  '43109': {
    name: 'Hôtel du Département 1',
    coords: [3.835088, 43.62194],
  },
  '43111': {
    name: 'Pergola 1',
    coords: [3.839669, 43.617449],
  },
  '43113': {
    name: 'Tonnelles 1',
    coords: [3.839642, 43.613444],
  },
  '43115': {
    name: 'Jules Guesde 1',
    coords: [3.8467, 43.611348],
  },
  '43117': {
    name: 'Astruc 1',
    coords: [3.854937, 43.610214],
  },
  '43119': {
    name: 'Les Arceaux 1',
    coords: [3.862459, 43.609848],
  },
  '43121': {
    name: 'Plan Cabanes 1',
    coords: [3.868087, 43.608511],
  },
  '43123': {
    name: 'Saint-Denis 1',
    coords: [3.874004, 43.605581],
  },
  '43125': {
    name: 'Observatoire 1',
    coords: [3.876727, 43.606365],
  },
  '43127': {
    name: 'Gare Saint-Roch - République 1',
    coords: [3.879751, 43.605273],
  },
  '43133': {
    name: 'Saint-Martin 1',
    coords: [3.880321, 43.592128],
  },
  '43135': {
    name: 'Restanque 1',
    coords: [3.885075, 43.590318],
  },
  '43139': {
    name: 'La Rauze 1',
    coords: [3.895904, 43.593495],
  },
  '43141': {
    name: 'Georges Frêche - Hôtel de Ville 1',
    coords: [3.895059, 43.59941],
  },
  '43145': {
    name: 'Pablo Picasso 1',
    coords: [3.903508, 43.597761],
  },
  '43149': {
    name: 'Boirargues 1',
    coords: [3.925658, 43.582658],
  },
  '43151': {
    name: 'EcoPôle 1',
    coords: [3.935098, 43.57802],
  },
  '43153': {
    name: 'Parc Expo 1',
    coords: [3.945773, 43.572811],
  },
  '43155': {
    name: 'Pérols Centre 1',
    coords: [3.957333, 43.565421],
  },
  '43161': {
    name: 'Cougourlude 1',
    coords: [3.914056, 43.57138],
  },
  '43201': {
    name: 'Pérols Étang de l\'Or',
    coords: [3.963654, 43.557851],
  },
  '43203': {
    name: 'Pérols Centre',
    coords: [3.957371, 43.565434],
  },
  '43205': {
    name: 'Parc Expo',
    coords: [3.945847, 43.572894],
  },
  '43207': {
    name: 'EcoPôle',
    coords: [3.935182, 43.578116],
  },
  '43209': {
    name: 'Boirargues',
    coords: [3.925704, 43.58271],
  },
  '43213': {
    name: 'Pablo Picasso',
    coords: [3.903571, 43.597781],
  },
  '43217': {
    name: 'Georges Frêche - Hôtel de Ville',
    coords: [3.894947, 43.599488],
  },
  '43219': {
    name: 'La Rauze',
    coords: [3.895902, 43.593557],
  },
  '43223': {
    name: 'Restanque',
    coords: [3.885141, 43.590402],
  },
  '43225': {
    name: 'Saint-Martin',
    coords: [3.8804, 43.592206],
  },
  '43231': {
    name: 'Gare Saint-Roch - République',
    coords: [3.879692, 43.605175],
  },
  '43233': {
    name: 'Observatoire',
    coords: [3.87676, 43.606413],
  },
  '43235': {
    name: 'Saint-Denis',
    coords: [3.872743, 43.606255],
  },
  '43237': {
    name: 'Plan Cabanes',
    coords: [3.868155, 43.608578],
  },
  '43239': {
    name: 'Les Arceaux',
    coords: [3.861741, 43.610037],
  },
  '43241': {
    name: 'Astruc',
    coords: [3.854919, 43.610296],
  },
  '43243': {
    name: 'Jules Guesde',
    coords: [3.846754, 43.6114],
  },
  '43245': {
    name: 'Tonnelles',
    coords: [3.839647, 43.613555],
  },
  '43247': {
    name: 'Pergola',
    coords: [3.839182, 43.618259],
  },
  '43249': {
    name: 'Hôtel du Département',
    coords: [3.834989, 43.622],
  },
  '43251': {
    name: 'Pilory',
    coords: [3.832001, 43.619585],
  },
  '43253': {
    name: 'Celleneuve',
    coords: [3.825813, 43.615549],
  },
  '43255': {
    name: 'Mosson T3',
    coords: [3.819674, 43.616241],
  },
  '43259': {
    name: 'Lattes Centre',
    coords: [3.905137, 43.570684],
  },
  '43261': {
    name: 'Cougourlude',
    coords: [3.914059, 43.571303],
  },
  '44102': {
    name: 'Albert 1er - Cathédrale 1',
    coords: [3.873787, 43.614771],
  },
  '44103': {
    name: 'Peyrou - Arc de Triomphe 1',
    coords: [3.872367, 43.61147],
  },
  '44104': {
    name: 'Saint-Guilhem - Courreau 1',
    coords: [3.87374, 43.607983],
  },
  '44105': {
    name: 'Garcia Lorca',
    coords: [3.890858, 43.591082],
  },
  '44106': {
    name: 'Garcia Lorca',
    coords: [3.891131, 43.591271],
  },
  '44201': {
    name: 'Garcia Lorca',
    coords: [3.891183, 43.591226],
  },
  '44202': {
    name: 'Albert 1er - Cathédrale',
    coords: [3.87368, 43.614797],
  },
  '44203': {
    name: 'Peyrou - Arc de Triomphe',
    coords: [3.872229, 43.611475],
  },
  '44204': {
    name: 'Saint-Guilhem - Courreau',
    coords: [3.873659, 43.607939],
  },
  '44205': {
    name: 'Garcia Lorca',
    coords: [3.890908, 43.59104],
  },
};

export default {
  type: 'FeatureCollection',
  features: Object.values(stops).map((stop) => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: stop.coords,
    },
    properties: {
      name: stop.name,
      routes: [],
    },
  })),
};
