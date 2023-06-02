-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 19 août 2022 à 15:56
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
SET foreign_key_checks = 0;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `musclay`
--

-- --------------------------------------------------------

--
-- Structure de la table `exercises`
--

DROP TABLE IF EXISTS `exercises`;
CREATE TABLE IF NOT EXISTS `exercises` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'L''identifiant de l''exercice',
  `name` varchar(64) NOT NULL COMMENT 'Le nom de l''exercice',
  `description` text COMMENT 'La description de l''exercice',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'La date de création de l''exercice',
  `updated_at` timestamp NULL DEFAULT NULL COMMENT 'La date de la dernière mise à jour de l''exercice',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `exercises`
--

INSERT INTO `exercises` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Relevés de buste', 'Cet exercice de musculation travaille les abdominaux. Il raffermit la taille et développe la sangle abdominale si on utilise un poids pour lester. Il nécessite un banc incliné dédié aux abdominaux.', '2022-08-14 19:36:53', NULL),
(2, 'Relevés de bassin', 'Cet exercice de musculation travaille les abdominaux et raffermit la \r\n  taille. Il a la réputation de solliciter le bas des abdominaux. A la \r\n  différence d\'autres exercices, celui-ci ne permet pas rajouter du lest, \r\n  mais il n\'en reste pas moins efficace.', '2022-08-14 19:36:53', NULL),
(3, 'Le développé Pallof', 'Et non, il ne s’agit pas d’un exercice pour la poitrine ou les \r\n  épaules. Cette fois-ci, ce sont les abdominaux qui s’y collent ! \r\n  Cet exercice qui porte le nom du physiothérapeute John Pallof a \r\n  l’air au premier abord assez facile. Mais détrompez-vous, il est plus \r\n  difficile qu’il n’y parait !', '2022-08-14 19:36:53', NULL),
(4, 'Rotation du buste à la poulie', 'Voici un exercice d\'isolation que je pratique régulièrement à la fin de \r\n	ma séance d\'abdominaux. Il est utile pour renforcer la taille, plus \r\n	particulièrement les obliques, sur le côté, et se fait en unilateral. Il a \r\n	la réputation de réduire le tour de taille et d\'aider à faire partir \r\n	les poignées d\'amour. Mais comme vous le savez, c\'est surtout votre diète \r\n	qui agira sur ces amas graisseux… Avec une charge convenable, vous allez \r\n	sentir vos obliques travailler, croyez-moi ! ', '2022-08-14 19:36:53', NULL),
(5, 'Gainage des obliques avec le Side bridge', 'La plupart d’entre nous pensent que les exercices d’abdominaux dynamiques comme les crunchs ou les relevés de bassin sont les meilleurs exercices pour les abdominaux. Les  exercices de gainage  sont souvent délaissés au profit de ces exercices populaires.\r\n	Cependant, il ne faut pas sous-estimer ces exercices, notamment le Side Bridge – et ses variantes – qui pourraient bien vous réserver quelques surprises.', '2022-08-14 19:36:53', NULL),
(6, 'Extensions au banc', 'Cet exercice de musculation renforce les lombaires et sollicite \r\n  indirectement un grand nombre de muscles de muscles de la chaîne \r\n  postérieure. Des lombaires musclés et solides, en plus d\'être esthétiques, \r\n  sont très utiles pour de nombreux exercices où les charges peuvent être \r\n  importantes. C\'est notamment le cas du squat et du soulevé de terre, mais \r\n  ils participent aussi durant les tirages et certains développés.', '2022-08-14 19:36:53', NULL),
(7, 'Le rowing inversé', 'Le rowing inversé est un des meilleurs exercices de musculation \r\n  pour le dos, quand il est correctement exécuté. Il permet de \r\n  renforcer le haut du dos, les dorsaux, les arrières d’épaules, \r\n  les biceps et les muscles de la taille en isométrie (gainage).\r\n  En plus de développer la masse musculaire du dos, le rowing \r\n  inversé, pratiqué régulièrement, sera bénéfique pour la posture et \r\n  permettra « d’ouvrir le buste » de ceux qui ont les épaules qui \r\n  partent en avant. ', '2022-08-14 19:36:53', NULL),
(8, 'Flexions latérales du buste au banc', 'Les flexions latérales du buste au banc composent un exercice efficace pour travailler les muscles de la taille, afin de muscler ou d\'affiner et raffermir cette dernière. C\'est un mouvement simple qui demande peu de matériel mais qui doit être exécuté correctement pour éviter les blessures.', '2022-08-14 19:36:53', NULL),
(9, 'Torsion de bassin couché', 'Cet exercice de musculation affine et raffermit la taille. Il développe les obliques situés sur le côté de la taille.', '2022-08-14 19:36:53', NULL),
(10, 'Sit-up', 'Cet exercice de musculation raffermit la taille et muscle les abdominaux. Il a la réputation de travailler le bas du ventre, là où le crunch au sol sollicite plutôt le haut des abdominaux.', '2022-08-14 19:36:53', NULL),
(11, 'Crunch à la poulie haute', 'Le crunch à la corde effectué sur la poulie haute est un exercice très efficace pour travailler la sangle abdominale. Il consiste à enrouler le buste vers l\'avant en tirant sur la poulie, ce qui reproduit le mouvement du crunch classique, mais à la verticale. ', '2022-08-14 19:36:53', NULL),
(12, 'Crunch au sol', 'Le crunch est un exercice simple et efficace pour muscler les abdominaux. \r\n	Il affine et raffermit la taille si vous travaillez avec le poids du corps, \r\n	et développe les abdominaux si vous utilisez un lest de plus en plus lourd. \r\n	Il ne nécessite pas de matériel et peut être réalisé n’importe où.', '2022-08-14 19:36:53', NULL),
(13, 'Relevés de jambes en suspension', 'Cet exercice de musculation travaille les abdominaux et développe les \r\n  obliques grâce à la torsion de bassin sur le côté. Il est assez \r\n  difficile à réaliser en suspension car il faut se maintenir accroché à \r\n  la barre.', '2022-08-14 19:36:53', NULL),
(14, 'Le soulevé de terre Sumo', 'C’est assez agaçant quand quelqu’un vient vous dire au milieu d’une \r\n  série éreintante de soulevé de terre : « Tu le fais mal la ! ». \r\n  Mais il faut rester zen, car toute critique est bonne à prendre \r\n  et il faut sans cesse essayer d’améliorer sa technique.', '2022-08-14 19:36:53', NULL),
(15, 'Hack squat', 'Cet exercice de musculation sollicite et développe les muscles des \r\n    cuisses et les fessiers. Si vous avez tendance à tout prendre dans les \r\n	fessiers, ce mouvement est fait pour vous ! Il fait plus travailler les \r\n	quadriceps et moins les fessiers. C\'est une bonne alternative au\r\n	squat à la barre, un exercice certes efficace \r\n	mais qui ne convient pas à tout le monde.', '2022-08-14 19:36:53', NULL),
(16, 'Leg curl ischios', 'Cet exercice de musculation sollicite et tonifie l’arrière des \r\n  cuisses. C’est un exercice d’isolation qui est efficace pour ces muscles \r\n  mais moins rentable que les exercices poly articulaires comme le soulevé \r\n  de terre et ses variantes qui vous feront prendre \r\n  plus de masse aux cuisses.', '2022-08-14 19:36:53', NULL),
(17, 'Squat barre', 'Cet exercice de musculation sollicite et développe l’ensemble du corps \r\n  mais vise principalement les muscles des cuisses et les fessiers. C\'est \r\n  l\'exercice roi de la musculation. « Ceux qui ne font pas de squat, ne \r\n  font pas de musculation » est une expression qu\'on entend souvent de la \r\n  bouche des culturistes. Assez technique, il demande un bon équilibre et une \r\n  certaine souplesse. Efficace et rentable, il ne convient pas à toutes les \r\n  morphologies qui tireront plus de bénéfices d\'autres exercices.', '2022-08-14 19:36:53', NULL),
(18, 'Presse à cuisses', 'Cet exercice de musculation sollicite les muscles des cuisses et les fessiers. \r\n  Il est considéré comme moins risqué que le squat à la barre \r\n  car la charge est répartie sur l’ensemble du dos grâce au \r\n  dossier de la machine. Il n’est cependant pas impossible de se blesser \r\n  dessus si on pousse n\'importe comment. \r\n  De plus, les presses à cuisses sont souvent mal conçues et \r\n  ne correspondent pas à toutes les morphologies ce qui peut \r\n  poser des problèmes.\r\n  En revanche, il est possible de \r\n  reposer la charge à tout moment grâce à des poignets bloquantes sur le \r\n  côté de la machine. On peut donc faire ses séries jusqu’à l’échec \r\n  musculaire ce qui n’est pas possible au squat libre.', '2022-08-14 19:36:53', NULL),
(19, 'Squat une jambe', 'Cet exercice de musculation sollicite les muscles des \r\n  cuisses et les fessiers. Il est très efficace et excellent pour développer la \r\n  coordination et l’équilibre, en plus de faire gagner du muscle aux cuisses et \r\n  fessiers. Il s’exécute de la même façon que le squat mais sur une \r\n  seule jambe.Il convient parfaitement à ceux qui n’ont pas ou \r\n  très peu de matériel, à ceux qui ont des problèmes au dos et qui ne \r\n  peuvent pas faire de squat à la barre. C\'est d\'ailleurs sur cet exercice que \r\n	les pratiquants de la méthode Lafay construisent leurs cuisses.', '2022-08-14 19:36:53', NULL),
(20, 'Relevés de jambes renversés', 'Voici un excellent mouvement pour muscler vos abdominaux \r\n  et renforcer votre buste. Les relevés de jambes renversés à la \r\n  barre peuvent être réalisés partout. Pas besoin de machines ou \r\n  d’appareils de musculation compliqués, il suffit d’une barre ou \r\n  d’un support solide à agripper et le tour est joué.\r\n  Cet exercice de musculation \r\n  vous rendra fort. Mais il faut \r\n  avouer qu’il est assez difficile à réaliser surtout si vous êtes \r\n  débutant. Quand j’ai commencé les relevés de jambes renversés, \r\n  je n’arrivais à faire que 4 ou 5 répétitions. Avec \r\n  l’entraînement, j’ai pu monter jusqu’à 20 répétitions \r\n  et mes abdominaux sont durs comme de l’acier.', '2022-08-14 19:36:53', NULL),
(21, 'Flexions du buste à la machine', 'Avoir des abdominaux musclés n\'est pas seulement un avantage esthétique, c\'est aussi d\'une grande importance pour améliorer vos performances dans d\'autres exercices de musculation et dans des sports parallèles. Cela permet également de prévenir les problèmes de dos. C\'est pourquoi il existe de nombreux exercices pour travailler les abdominaux et, parmi eux, les flexions du buste à la machine. Cette dernière est équipée d\'un dossier et de poignées qui aident à effectuer le mouvement correctement. Il est aussi possible d\'ajouter du poids à l\'exercice.', '2022-08-14 19:36:53', NULL),
(22, 'La planche', 'Le gainage face au sol, aussi appelé « planche » est un exercice isométrique, c\'est-à-dire qu\'il se pratique de façon statique. Le but est de maintenir une position pendant un certain temps en utilisant les muscles posturaux pour verrouiller les articulations. C\'est un exercice surtout utilisé pour renforcer les muscles profonds de l\'abdomen, \r\n	obtenir un ventre plus plat et réduire les risques de blessure d\'un entraînement classique.', '2022-08-14 19:36:53', NULL),
(23, 'Relevés de jambes', 'Cet exercice de musculation exécuté sur un banc incliné raffermit les abdominaux et la taille. Il travaille à la fois les abdominaux et les fléchisseurs de la hanche.', '2022-08-14 19:36:53', NULL),
(24, 'Roue abdominale', 'La roue abdominale est un accessoire peu onéreux qui permet d\'effectuer des mouvements très efficaces pour muscler les abdominaux, améliorer la posture et la stabilité du corps, si l\'on sait comment bien l\'utiliser. ', '2022-08-14 19:36:53', NULL),
(25, 'Développé couché aux haltères', 'Le développé couché est un exercice de base pour cibler les pectoraux. Il peut s\'exécuter avec une barre ou sur machine. Mais, avec des haltères, il possède l’intérêt de permettre un mouvement plus naturel, une meilleure contraction des pectoraux et un plus grand étirement des muscles. C\'est un exercice qui fait appel aux muscles stabilisateurs et qui n\'est pas aussi facile à maîtriser que le développé couché à la barre. En effet, le corps doit d\'abord s\'habituer à trouver l\'équilibre. Parce que la stabilisation rajoute de la difficulté, il n\'est pas possible de soulever aussi lourd qu\'avec une barre.', '2022-08-14 19:36:53', NULL),
(26, 'Rowing un bras', 'Cet exercice de musculation sollicite les muscles du dos. L’utilisation du \r\n  banc permet d’éviter le travail des lombaires. Vous pouvez alors plus vous concentrer sur le travail des muscles du dos sans vous \r\n  occuper de son alignement. On peut alors manipuler des charges assez \r\n  importantes.', '2022-08-14 19:36:53', NULL),
(27, 'Tirage prise serrée', 'Cet exercice de musculation sollicite les muscles du dos. Le travail à la \r\n	poulie haute est intéressant quand il n\'est pas possible de faire des \r\n	tractions à la barre fixe, avec le poids du corps. On peut facilement régler \r\n	la charge de départ avec un poids qui correspond à notre niveau de force, et \r\n	l\'augmenter au fur et à mesure des progrès. La prise serrée sollicite \r\n	surtout le grand dorsal, le grand rond et bien sûr les biceps.', '2022-08-14 19:36:53', NULL),
(28, 'Développé décliné', 'Cet exercice de musculation de base sollicite plutôt les parties moyennes \r\n  et inférieures des pectoraux. Il permet de gagner de la force en plus de \r\n  galber la poitrine. On peut le réaliser sur un banc à la barre (avec un \r\n  partenaire) ou avec des haltères qui permettent plus d\'amplitude. C\'est un \r\n  exercice qui demande de la pratique pour être maîtrisé.', '2022-08-14 19:36:53', NULL),
(29, 'Rowing barre T', 'Cet exercice de musculation \r\n  sollicite les muscles du dos en épaisseur. Il existe des machines \r\n  spécifiques pour faire du rowing à la barre T, \r\n  mais il est possible de faire l\'exercice avec une simple barre droite \r\n  coincée dans un angle. Il suffit d’une barre et de quelques rondelles de fonte \r\n  pour pouvoir le faire.', '2022-08-14 19:36:53', NULL),
(30, 'Tractions à la barre fixe', 'Cet exercice de musculation sollicite et développe les muscles du dos, surtout au niveau de la largeur. \r\n	Les tractions à la barre fixe sont de formidables bâtisseuses de dorsaux. En \r\n	tant que mouvement de base, nous vous conseillons de l\'inclure dans votre \r\n	routine de dos. Ceux qui ne peuvent pas faire de tractions avec le poids du \r\n	corps pourront se diriger vers les tirages à la poulie haute.', '2022-08-14 19:36:53', NULL),
(31, 'Élévations latérales buste penché (Oiseau)', 'Cet exercice de musculation sollicite les épaules, plus \r\n    particulièrement le faisceau postérieur situé à l\'arrière. C’est un exercice d’isolation \r\n	idéal pour cibler cette partie du deltoïde souvent en retard par rapport au \r\n	reste. En effet, on a tendance à avoir plus de deltoïdes antérieurs (avant \r\n	des épaules) car les exercices qui ont le plus de succès auprès des \r\n	pratiquants sollicitent beaucoup cette \r\n	zone : développé couché, \r\n	dips, développés épaules…', '2022-08-14 19:36:53', NULL),
(32, 'Mollets au donkey', 'Cet exercice de musculation sollicite les mollets, jumeaux et \r\n  soléaire. Il est peu pratiqué en salle faute de machine spécifique ou de \r\n  partenaire audacieux.  En effet, il est difficile de trouver un ou une \r\n  partenaire qui accepte de vous monter dessus ! Il donne néanmoins de bonnes sensations \r\n  sur les jumeaux. On peut le remplacer par l\'exercice de mollets à la presse à \r\n  cuisses.', '2022-08-14 19:36:53', NULL),
(33, 'Ecarté couché incliné', 'Cet exercice de musculation est un exercice d\'isolation qui permet \r\n  de travailler la partie supérieure des \r\n  pectoraux \r\n  (partie claviculaire). Il minimise l\'intervention \r\n  des épaules (deltoïde antérieur) \r\n  et ne sollicite quasi pas les\r\n  triceps.\r\n  Généralement, cet exercice de musculation est placé à la fin de la séance de \r\n  pectoraux comme mouvement de finition après les exercices lourds pour la masse.', '2022-08-14 19:36:53', NULL),
(34, 'Tractions au sternum Gironda', 'Après les dips façon Gironda, nous vous \r\n  présentons une façon peu commune de travailler son dos : les \r\n  tractions au sternum ! Cette variante popularisée par Vince Gironda, une des \r\n  personnalités les plus influentes et respectées dans le monde du \r\n  bodybuilding des années 50, implique de garder le torse penché \r\n  en arrière tout le long du mouvement.', '2022-08-14 19:36:53', NULL),
(35, 'Tirage nuque', 'Cet exercice de musculation sollicite les muscles du dos surtout \r\n  au niveau de la largeur. Le travail à la poulie haute \r\n  permet à ceux qui ne sont pas encore capable de faire des tractions à la \r\n  barre fixe avec leur poids du corps, de muscler leur dos en largeur.', '2022-08-14 19:36:53', NULL),
(36, 'Biceps avec le curl Zottman', 'Pour continuer dans la lignée des exercices de \r\n  musculation \r\n  oubliés, nous nous intéressons aujourd’hui au curl Zottman, une \r\n  variante du curl haltères qui vise les biceps mais aussi les \r\n  avant-bras. George Zottman était un homme fort dans les \r\n  années 1880/1890, considéré en son temps comme l’homme le plus \r\n  fort des Etats-Unis. Il a établi de nombreux records de force au \r\n  squat,\r\n  soulevé de terre et développé \r\n  un bras, dont certains sont encore de nos jours inégalés.\r\n  Même à 57 ans, il avait des avant-bras \r\n  bien massifs et musclés de près de 42 cm (contractés) si l’on \r\n  se fie aux sources de l’époque.\r\n  Bien que de nombreux athlètes \r\n  aient aujourd’hui oublié l’homme et ses records, il a laissé son \r\n  nom à un des meilleurs exercices pour à la fois matraquer bras \r\n  et avant-bras: le curl Zottman.', '2022-08-14 19:36:53', NULL),
(37, 'Les élévations latérales aux câbles', 'Si vous voulez une carrure athlétique, \r\n  avec des épaules larges et bien rondes, alors il faudra vous \r\n  attarder sur les deltoïdes externes. Ces muscles sont ceux qui \r\n  vous donneront cette largeur tant recherchée par \r\n  les culturistes.', '2022-08-14 19:36:53', NULL),
(38, 'Les dips façon Gironda', 'Vince Gironda est un culturiste des années 50, considéré à \r\n  l’époque comme l\'un des meilleurs entraîneurs de bodybuilding. Surnommé le « Iron \r\n  Guru », il a entrainé et porté à la victoire de nombreux \r\n  athlètes, dont le plus connu est Larry Scott.\r\n  De nombreuses stars du bodybuilding se sont entrainées dans son \r\n  gymnase comme Lou Ferrigno « l’incroyable Hulk », Frank Zane \r\n  et même Arnold Schwarzenegger.', '2022-08-14 19:36:53', NULL),
(39, 'Développé couché prise serrée', 'Le développé couché prise serrée est une variante du développé couché standard qui met l\'accent sur les triceps. C\'est un des mouvements pour les triceps qui permet de porter les charges les plus lourdes.', '2022-08-14 19:36:53', NULL),
(40, 'Extensions à la poulie haute', 'Cet exercice de \r\n  musculation développe les triceps si vous utilisez des charges \r\n  de plus en plus lourdes. C\'est un exercice d\'isolation simple mais pas aussi rentable en terme de gains musculaires que les \r\n  exercices de base comme les \r\n  dips ou les \r\n  développés à la barre.\r\n  Il est généralement conseillé aux débutants du fait de sa \r\n  facilité d\'exécution et permet une bonne approche. Les plus chevronnés pourront le placer à la fin de la séance de musculation \r\n  des triceps et utiliser des accessoires variés pour travailler différemment.\r\n  Cet exercice permet d\'obtenir une résistance constante pendant \r\n  tout le parcours du mouvement ce qui n\'est pas le cas avec des poids \r\n  libres.', '2022-08-14 19:36:53', NULL),
(41, 'Good Morning barre', 'Cet exercice de musculation sollicite les lombaires, fessiers et arrières cuisses. Il est peu pratiqué en salle car particulièrement risqué si mal exécuté. On laissera ce mouvement aux pratiquants chevronnés et on lui préfèrera les extensions du buste au banc.', '2022-08-14 19:36:53', NULL),
(42, 'Exercices dos : Tirage barre cuisses', 'Le tirage barre cuisses est un mouvement d’isolation qui permet, généralement, de « finir » le dos. C’est une variante du pull-over classique avec un haltère dont la position peu stable demande une certaine pratique et empêche l’utilisation de charges trop lourdes. Cependant, avec suffisamment de maîtrise, il est possible d’obtenir une grande congestion du dos.', '2022-08-14 19:36:53', NULL),
(43, 'Mollets assis', 'Cet exercice de musculation sollicite le soléaire, un muscle puissant de la \r\n  jambe qui permet l\'extension du pied. Les muscles soléaires, très \r\n  résistants, sont essentiellement constitués de fibres lentes. Il faudra donc travailler en séries plutôt longues. Il est préférable de \r\n  commencer sa séance de mollets par les exercices de musculation ou les jambes \r\n  sont tendues comme les mollets debout, et finir par les \r\n  exercices assis.', '2022-08-14 19:36:53', NULL),
(44, 'Élévations latérales à la machine', 'Cet exercice est une variante des élévations latérales classiques et demande d\'avoir accès à une machine spécifique. Le mouvement se pratique assis et permet de cibler précisément les deltoïdes. Cela apporte une grande efficacité, même s\'il est alors plus difficile de lever des charges lourdes, notamment parce qu\'il est impossible de tricher en donnant de l\'élan. De plus, la machine sécurise les épaules en évitant les oscillations et les mauvais mouvements pour préserver les articulations et les tendons. ', '2022-08-14 19:36:53', NULL),
(45, 'Tirage sol poulie basse', 'Cet exercice de musculation appelé tirage à la poulie basse ou « tirage \r\n    sol » sollicite les muscles du dos en épaisseur. C\'est un très bon \r\n    exercice pour gagner de la masse musculaire sur l\'ensemble du dos, notamment \r\n	la partie supérieure. Si vous manquez de volume dans cette zone, cet \r\n	exercice est fait pour vous et vous aidera à gagner en épaisseur rapidement. ', '2022-08-14 19:36:53', NULL),
(46, 'Développé à la machine convergente', 'Voici une machine guidée que j\'apprécie beaucoup et qui m\'a \r\n  permis d\'améliorer mes pectoraux, surtout la partie interne et \r\n  supérieure. A force de faire du \r\n  développé couché et des \r\n  dips, les \r\n  parties sternale et supérieure des pectoraux peuvent présenter un \r\n  retard difficile à combler. La \'Hammer Strength\', une machine \r\n  convergente servant à faire des développés en position assise \r\n  peut vous aider dans cette tache.\r\n  S\'entrainer sur ce type de machine est un vrai plaisir ! On \r\n  développe la charge au dessus de la poitrine en effectuant un \r\n  mouvement en arc de cercle qui rapproche les poignets l\'une de \r\n  l\'autre. L\'exercice guidé permet de travailler en toute sécurité \r\n  sur un parcours plus naturel que les machines habituelles. On ne \r\n  ressent pas d\'inconfort articulaire comme c\'est souvent le cas \r\n  avec des développés sur la Smith machine. ', '2022-08-14 19:36:53', NULL),
(47, 'Rowing menton', 'Si vous voulez gagner de la largeur d\'épaules et épaissir le haut de votre \r\n	dos, alors le rowing menton devrait vous intéresser ! Cet exercice de musculation \r\n	appelé qui consiste à faire un tirage vertical avec la barre en l\'amenant \r\n	jusqu\'au menton, un « rowing menton », sollicite les muscles des épaules et les trapèzes \r\n	indirectement.', '2022-08-14 19:36:53', NULL),
(48, 'Développé nuque', 'Cet exercice de musculation sollicite les épaules. Les développés sont des \r\n	mouvements basiques, très efficaces pour se forger de bonnes épaules. Dans \r\n	cette variante de développé, on descend la barre verticalement derrière la \r\n	nuque, jusqu\'au niveau des oreilles. L\'objectif est de cibler \r\n	le côté et l\'arrière de l\'épaule, par rapport au développé par devant qui lui cible plutôt l\'avant.', '2022-08-14 19:36:53', NULL),
(49, 'Le Power Clean', 'Comme vous avez pu le constater, je suis toujours à la recherche de nouveaux exercices pour varier un peu mes entraînements et \r\n    éviter la routine. Aujourd’hui, nous nous intéressons au Power Clean, une version « bodybuilding » de l\'épaulé des haltérophiles.', '2022-08-14 19:36:53', NULL),
(50, 'Le Développé Cubain', 'Aujourd’hui, nous nous intéressons à l’un des meilleurs exercices de \r\n  musculation pour renforcer la stabilité de l’épaule : le \r\n  développé Cubain !', '2022-08-14 19:36:53', NULL),
(51, 'Curl prise marteau haltères', 'Le curl prise marteau avec haltères, ou « Hammer curl », est une variante du curl haltère classique qui s’exécute avec les haltères en prise neutre, aussi appelée prise marteau. C’est un exercice qui cible les biceps, à l’instar des autres variantes du curl, mais qui met aussi l’accent sur les avant-bras. C’est d’ailleurs le meilleur exercice pour solliciter le long supinateur, un muscle qui augmente la taille des avant-bras.', '2022-08-14 19:36:53', NULL),
(52, 'Curl barre', 'Cet exercice de musculation sollicite et développe les biceps. Le curl \r\n  barre est l’exercice d’isolation de base pour les biceps.', '2022-08-14 19:36:53', NULL),
(53, 'Extensions des poignets à la barre', 'L\'extension des poignets à la barre est un exercice d\'isolation pur qui sollicite les extenseurs de l\'avant-bras dans sa face externe, contrairement aux flexions des poignets qui travaillent, elles, la face interne. ', '2022-08-14 19:36:53', NULL),
(54, 'Dips', 'Les répulsions aux barres parallèles ou « Dips » est un exercice de \r\n  musculation de base qui permet de travailler \r\n  l\'ensemble du buste. Les dips sont très efficaces et de formidables bâtisseuses de muscles.\r\n  Si cet exercice est trop difficile voir impossible \r\n  à réaliser, vous pouvez débuter par les dips entre deux bancs. Un fois \r\n  l\'exercice maîtrisé, passez aux barres parallèles avec le poids du \r\n  corps. Plus tard, vous pourrez même accrocher un lest autour de la \r\n  taille pour ajouter encore de la difficulté à l\'exercice.', '2022-08-14 19:36:53', NULL),
(55, 'Pull-over', 'Cet exercice de musculation est souvent placé dans la séance de \r\n  pectoraux. Pourtant, si on touche le grand pectoral pendant l\'exécution, \r\n  on se rend compte qu\'il est plutôt décontracté alors que le grand dorsal \r\n  (muscle du dos) est sous tension. Le pull-over sollicite donc plutôt le \r\n  dos.', '2022-08-14 19:36:53', NULL),
(56, 'Biceps avec le curl Gironda', 'Après les dips Gironda et les \r\n  tractions au sternum, nous \r\n  terminons les articles dédiés aux exercices inédits de l’« Iron \r\n  Guru » avec les curls façon Gironda.', '2022-08-14 19:36:53', NULL),
(57, 'Poulie vis-à-vis', 'Cet exercice de musculation est un exercice d\'isolation pour les \r\n  pectoraux. Pour le faire, on utilise une machine avec deux poulies hautes reliées à \r\n  deux poignées. L\'intervention de l\'épaule dans le mouvement est réduite \r\n  et celle des triceps quasi nulle.\r\n  Généralement, cet exercice de finition est utilisé pour congestionner \r\n  les pectoraux en fin de séance.', '2022-08-14 19:36:53', NULL),
(58, 'Curl haltère', 'Cet exercice de musculation sollicite et développe les biceps. Les haltères \r\n  permettent pas mal de variantes intéressantes.', '2022-08-14 19:36:53', NULL),
(59, 'Flexions des poignets avec haltères', 'Les flexions des poignets aux haltères sont une variante des flexions des poignets à la barre et représentent un exercice tout à fait efficace pour muscler les avant-bras. ', '2022-08-14 19:36:53', NULL),
(60, 'Barre-front', 'Cet exercice de musculation développe la masse et la force des triceps, à \r\n	l\'arrière des bras. Dans le jargon de la musculation, on le surnomme « barre-front \r\n	» du fait qu\'on amène la barre au niveau du front durant la phase négative du mouvement. Il consiste à faire des extensions à la barre droite ou \r\n	à la barre EZ (plus confortable pour les coudes et les poignets), couché sur un banc ou allongé sur le sol. ', '2022-08-14 19:36:53', NULL),
(61, 'Flexions des poignets avec la barre', 'La flexion des poignets à la barre est le mouvement le plus pratiqué pour travailler les muscles fléchisseurs du poignet qui sont sollicités dans tous les exercices où il est question d\'empoigner des haltères ou une barre. C\'est dire leur importance. ', '2022-08-14 19:36:53', NULL),
(62, 'Elévations latérales', 'Cet exercice de musculation sollicite les épaules, plus \r\n    particulièrement le faisceau latéral, sur le côté, qui donne la fameuse largeur d’épaule \r\n	tant recherchée. Il est vrai que la carrure est la première chose que l\'on \r\n	remarque quand on croise quelqu\'un dans la rue. Larges et bien galbées, de \r\n	bonnes épaules vous mettent en valeur habillé. Plus besoin de rembourrage ou \r\n	d\'épaulettes pour accentuer la carrure de son costume ! Disons-le, des \r\n	épaules au top, énormes et sèches, ça fait son effet ! Alors mieux vaut \r\n	miser sur ce groupe musculaire clé et ne rien laisser au hasard…', '2022-08-14 19:36:53', NULL),
(64, 'Le curl Araignée', 'C\'est certain, tout le monde veut des gros bras ! C\'est un groupe \r\n  musculaire important quel que soit le niveau du pratiquant de \r\n  musculation. Arnold avait des \r\n  biceps comme des montagnes, et ceux du tout premier Mr Olympia - Larry Scott \r\n  - étaient énormes.', '2022-08-14 19:36:53', NULL),
(65, 'kick back', 'Cet exercice de musculation appelé « kick back » développe les triceps à \r\n  l\'arrière du bras. C\'est un exercice de finition qu\'on place généralement à \r\n  la fin de la séance de triceps pour obtenir une bonne congestion dans ces \r\n  muscles. On ne peut pas prendre très lourd sur cet exerice d\'isolation, et \r\n  ce n\'est pas le but. L\'objectif est de se concentrer sur les sensations \r\n  musculaires. \r\n  Nous vous conseillons de le placer à la fin de votre séance de \r\n  musculation des triceps, après les exercices poly-articulaires \r\n  de base - utilisés pour gagner un maximum de volume aux bras - comme les \r\n  dips\r\n  ou les développés qui plus « rentables ».', '2022-08-14 19:36:53', NULL),
(66, 'Mollets à la presse à cuisses', 'Cet exercice de musculation sollicite les mollets, jumeaux et \r\n  soléaire. Les sensations musculaires sont très différentes du fait de la \r\n  position sur la machine. La presse à cuisse est très sécuritaire et utile pour les personnes qui ont \r\n  des problèmes de dos et qui ne peuvent pas pratiquer les exercices où \r\n  une charge écrase la colonne vertébrale comme aux mollets debout.', '2022-08-14 19:36:53', NULL),
(67, 'Curl concentration', 'Cet exercice de musculation sollicite et développe les biceps. Le curl en \r\n	concentration est un exercice d\'isolation qui va vous permettre de peaufiner \r\n	vos bras. Les curls à la barre ou aux haltères sont les exercices de \r\n	musculation de base bien utiles pour développer la massse de vos biceps et \r\n  obtenir des gros bras. Vous devrez donc les privilégier. Ils \r\n  pourront éventuellement être complétés par du curl concentration pour \r\n  diversifier l\'entraînement des biceps. Cet exercice à la réputation de \r\n  développer le « pic » du biceps.', '2022-08-14 19:36:53', NULL),
(68, 'Le Muscle-Up', '« Tu ne fais jamais rien comme les autres ! ». Voila ce qu’on m’a sorti en me voyant m’entrainer au Muscle-up. Non, je ne cherche pas à être différent des autres et à attirer l\'attention sur moi. Mais après 13 années de musculation, j’ai besoin de me fixer des nouveaux challenges, la plupart de mes objectifs initiaux étant atteints.', '2022-08-14 19:36:53', NULL),
(69, 'Développé couché prise inversée', 'Le développé couché prise inversée est une variante du développé couché classique, qui se pratique avec les mains en supination plutôt qu\'en pronation. C\'est un exercice peu pratiqué mais qui possède l\'avantage de mettre l\'accent sur la sollicitation du haut des pectoraux, des triceps et de l\'avant des épaules. ', '2022-08-14 19:36:53', NULL),
(70, 'Le développé Arnold', 'Parmi les meilleurs exercices de musculation pour obtenir des épaules grosses comme des melons, on trouve les classiques développés qu’on peut réaliser à la barre ou aux haltères. Mais peu de gens connaissent le « développé Arnold ». ', '2022-08-14 19:36:53', NULL),
(71, 'Développé couché incliné barre', 'Cet exercice de \r\n  musculation est un exercice de base qui permet de travailler la \r\n  poitrine. L\'inclinaison du banc fait porter le stress sur la \r\n  partie supérieure des pectoraux mais aussi sur la partie \r\n  antérieure du deltoïde (avant des épaules). Plus le banc sera \r\n  incliné, plus les épaules seront sollicitées.\r\n  L\'utilisation des haltères permet de travailler dans une plus \r\n  grand amplitude qu\'avec la barre et nécessite plus d\'activité au niveau \r\n  des muscles stabilisateurs. Il est conseillé de démarrer votre séance de \r\n  musculation des pectoraux par des exercices inclinés si la partie \r\n  claviculaire (haut des pectoraux) est un point faible.', '2022-08-14 19:36:53', NULL),
(72, 'Curl pupitre', 'Cet exercice de musculation sollicite et développe les biceps si vous \r\n  utilisez un lest de plus en plus lourd. Le pupitre permet de plus se \r\n  concentrer sur le muscle et évite de tricher en se balançant.', '2022-08-14 19:36:53', NULL),
(73, 'Biceps avec le curl Zottman', 'Pour continuer dans la lignée des exercices de \r\n  musculation \r\n  oubliés, nous nous intéressons aujourd’hui au curl Zottman, une \r\n  variante du curl haltères qui vise les biceps mais aussi les \r\n  avant-bras. George Zottman était un homme fort dans les \r\n  années 1880/1890, considéré en son temps comme l’homme le plus \r\n  fort des Etats-Unis. Il a établi de nombreux records de force au \r\n  squat,\r\n  soulevé de terre et développé \r\n  un bras, dont certains sont encore de nos jours inégalés.\r\n  Même à 57 ans, il avait des avant-bras \r\n  bien massifs et musclés de près de 42 cm (contractés) si l’on \r\n  se fie aux sources de l’époque.\r\n  Bien que de nombreux athlètes \r\n  aient aujourd’hui oublié l’homme et ses records, il a laissé son \r\n  nom à un des meilleurs exercices pour à la fois matraquer bras \r\n  et avant-bras: le curl Zottman.', '2022-08-14 19:36:53', NULL),
(74, 'Pompes au sol', 'Tout le monde à déjà pratiqué cet exercice de musculation au moins une \r\n  fois ! C\'est un classique du genre qui permet de travailler l\'ensemble \r\n  du buste. On peut se construire de bons pectoraux avec seulement les pompes \r\n  mais à condition de savoir s\'y prendre pour bien développer toutes les \r\n  parties de ce groupe musculaire. En effet, selon la position des mains et \r\n  l\'inclinaison, on pourra favoriser le haut, le bas ou même l\'intérieur des \r\n  pectoraux.', '2022-08-14 19:36:53', NULL),
(75, 'Développé couché incliné aux haltères', 'Le développé couché incliné aux haltères est l\'un des exercices de musculation les plus utiles pour développer le haut des pectoraux. Chez la plupart des pratiquants, c\'est une zone en retard. La position inclinée est donc une solution pour rééquilibrer la poitrine. L\'utilisation des haltères permet alors une position plus naturelle qu\'avec une barre, une meilleure contraction, puisqu\'il est possible de rapprocher les mains, et un meilleur étirement. Enfin, cela permet de travailler davantage les muscles stabilisateurs.', '2022-08-14 19:36:53', NULL),
(76, 'Développé devant', 'Les développés sont parfaits pour se forger des épaules massives. Le \r\n   développé devant renforce les muscles des épaules, surtout l\'avant et le \r\n   côté, et indirectement le haut des pectoraux et les triceps. C’est un \r\n   exercice polyarticulaire très complet qui vous donnera plus de gains musculaires \r\n   et de force que les exercices d’isolation comme les élévations frontales ou \r\n   latérales. La version barre devant ou aux haltères sont deux des meilleurs \r\n   exercices pour les épaules, aussi bien pour les débutants que les confirmés.', '2022-08-14 19:36:53', NULL),
(77, 'Shrug barre', 'Cet exercice de musculation sollicite et développe les \r\n  trapèzes. \r\n  Ces grands muscles en éventail sont situés sur le haut du dos et \r\n  recouvrent toute la partie supérieure du cou et du dos.', '2022-08-14 19:36:53', NULL),
(78, 'Mollets debout', 'Cet exercice de musculation renforce et développe les mollets, plus \r\n  particulièrement les jumeaux tout au-dessus, du fait de la position james \r\n  tendues. Les jumeaux \r\n  sont constitués de fibres lentes et de fibres rapides, il faudra donc \r\n  les travailler en séries longues et courtes. Il est préférable de \r\n  commencer sa séance de mollets par les exercices de musculation comme \r\n  les mollets debout et de finir par les exercices assis.', '2022-08-14 19:36:53', NULL),
(79, 'Développé couché barre', 'Cet exercice de musculation très populaire développe la poitrine. Le développe couché est un \r\n  exercice de base qui fait intervenir deux \r\n  articulations (coude et épaule) et qui permet \r\n  de travailler l\'ensemble du buste, pas seulement les \r\n  pectoraux.\r\n  C\'est un des mouvement qui permet d\'évaluer la force musculaire \r\n  des membres supérieurs et qui est utilisé dans les épreuves de force \r\n  athlétique.', '2022-08-14 19:36:53', NULL),
(80, 'Le curl Incliné', 'Le Curl Incliné est une variante du \r\n	curl classique qui, comme ce dernier, est un exercice d\'isolation ciblant principalement le travail des biceps.', '2022-08-14 19:36:53', NULL),
(81, 'Extensions des poignets aux haltères', 'L\'extension des poignets aux haltères est une variante de l\'extension des poignets à la barre. Elle permet un mouvement plus naturel, et tout aussi efficace, pour muscler la partie externe des avant-bras. ', '2022-08-14 19:36:53', NULL),
(82, 'Tirage poitrine', 'Cet exercice de musculation \r\n  sollicite les muscles du dos au niveau \r\n  de la largeur. Le travail à la poulie haute permet à ceux qui ne sont \r\n  pas encore capables de faire des tractions sur la barre fixe avec le poids \r\n  du corps, d’exercer les dorsaux.', '2022-08-14 19:36:53', NULL),
(83, 'Les pompes Dive Bomber', 'Beaucoup de choses ont été écrites sur les \r\n  pompes, et vous \r\n  connaissez probablement toutes les variantes de cet exercice \r\n  surtout si vous êtes un adepte des mouvements au poids du corps. \r\n  Les pompes sont un des meilleurs exercices de \r\n  musculation pour remodeler les muscles du buste sans nécessiter \r\n  le moindre matériel.', '2022-08-14 19:36:53', NULL),
(84, 'Ecarté couché haltères', 'Cet exercice de musculation d\'isolation permet de travailler les pectoraux. Il minimise l\'intervention \r\n  des épaules (deltoïde antérieur) et ne sollicite \r\n  quasi pas les triceps. On \r\n  pourra le placer en fin de séance comme exercice de finition des pectoraux.', '2022-08-14 19:36:53', NULL),
(85, 'Pec-Deck', 'Cet exercice de musculation sollicite les pectoraux. C\'est un exercice \r\n  d\'isolation qui permet de travailler sur une grande amplitude. Très apprécié \r\n  par les débutants, le « butterfly » finalise généralement la session de \r\n  pectoraux après les mouvements de base. Si vous travaillez en séries assez \r\n  longues, il vous procurera de très bonnes sensations et une congestion \r\n  intense.', '2022-08-14 19:36:53', NULL),
(86, 'Curl pupitre à la machine', 'Ce type de curl est effectué sur une machine, munie d\'un pupitre, qu\'on nomme aussi pupitre Larry Scott, du nom du célèbre bodybuilder. C\'est un exercice d\'isolation pour les biceps qui sollicite mieux le brachial que les curls effectués de façon classique. De plus, la machine exerce une tension continue et uniforme durant tout le mouvement et limite la triche, ce qui oblige à conserver une technique propre. ', '2022-08-14 19:36:53', NULL),
(87, 'Face Pull : un 3 en 1 !', 'Le face pull est un exercice qui est peu pratiqué par les pratiquants de musculation. Et pourtant, c\'est un mouvement qui possède de nombreux avantages, notamment le fait de solliciter l\'arrière des épaules, zone souvent négligée, et le fait de renforcer la coiffe des rotateurs grâce à une rotation externe. ', '2022-08-14 19:36:53', NULL),
(88, 'Dips entre 2 bancs', 'Cet exercice de musculation est une variante des \r\n	dips classiques qui s\'effectue au poids de corps, entre deux bancs. Il demande beaucoup moins d’équilibre que les dips. Les dips entre 2 bancs permettent de solliciter les triceps, mais aussi les pectoraux et les épaules. De plus, ce mouvement peut être ajusté pour convenir aux débutants. Mais, il est également possible d\'en augmenter la difficulté pour les personnes qui possèdent plus de force. Cet exercice est également connu sous le nom de « répulsions entre deux bancs » ou « reverse dips ».', '2022-08-14 19:36:53', NULL),
(89, 'Rowing barre', 'Cet exercice de musculation travaille l’ensemble des muscles du dos, plutôt en épaisseur. Il est particulièrement efficace pour gagner de la \r\n  masse et épaissir le dos. La position penchée en avant rend cet exercice \r\n  risqué pour le bas du dos. Les débutants \r\n  en musculation doivent d’abord renforcer les lombaires et les abdominaux \r\n  avant de s’exercer sur cet exercice.', '2022-08-14 19:36:53', NULL),
(90, 'Développé assis à la machine', 'Le développé assis à la machine ou « presse à pectoraux », est une alternative au développé couché à la barre ou aux haltères, qui présente l\'avantage d\'être sécurisé et donc de permettre un travail plus lourd. ', '2022-08-14 19:36:53', NULL),
(91, 'Curls inversés à la barre', 'Les curls inversés avec la barre, aussi appelés « reverse curls » ou curls en pronation, sont une variante du mouvement de curl classique avec une barre. C\'est un mouvement qui permet de renforcer les poignets, les avant-bras et de développer la masse musculaire sur la partie basse du biceps. C\'est un exercice que l\'on réserve généralement aux pratiquants avancés, car il permet un travail de finition des avant-bras, zone qui est déjà travaillée par d\'autres exercices.', '2022-08-14 19:36:53', NULL),
(92, 'Extensions au-dessus de la tête', 'Cet exercice de musculation développe les muscles triceps qui se situe \r\n  sur la face postérieure du bras. La position du bras au-dessus de la \r\n  tête rend l\'exercice plus difficile par rapport au barre-front ou au \r\n  travail à la poulie haute. La charge utilisée sera donc moins \r\n  importante.', '2022-08-14 19:36:53', NULL),
(93, 'Développé couché à la smith machine', 'Le développé couché à la smith machine est une variante du développé couché classique qui se pratique grâce à un cadre guidé. Ce cadre a l\'avantage de sécuriser le mouvement et donc de limiter les accidents. Mais, cela permet aussi de mieux se concentrer sur la travail des pectoraux, de se passer de partenaire et de travailler lourd et/ou à l\'échec. ', '2022-08-14 19:36:53', NULL),
(94, 'Relevés de genoux', 'Cet exercice de musculation des abdominaux est souvent réalisé sur une chaise \r\n  romaine, un appareil qu’on trouve dans la plupart des salles de musculation. \r\n  Il raffermit et muscle la taille, les abdominaux mais aussi les \r\n  fléchisseurs de la hanche.', '2022-08-14 19:36:53', NULL),
(95, 'Crunchs avec rotation', 'Cet exercice de musculation affine et raffermit la taille si vous \r\n  travaillez sans haltère. Il développe les obliques si vous utilisez un \r\n  lest de plus en plus lourd.', '2022-08-14 19:36:53', NULL),
(96, 'Flexions Latérales', 'Cet exercice de musculation affine et raffermit la taille si vous travaillez sans charge. Il développe les obliques situés sur sur le côté de la taille, si vous utilisez des poids de plus en plus lourds.', '2022-08-14 19:36:53', NULL),
(97, 'Le Power Clean', 'Comme vous avez pu le constater, je suis toujours à la recherche de nouveaux exercices pour varier un peu mes entraînements et \r\n    éviter la routine. Aujourd’hui, nous nous intéressons au Power Clean, une version « bodybuilding » de l\'épaulé des haltérophiles.', '2022-08-14 19:36:53', NULL),
(98, 'Leg curl assis', 'Le leg curl assis est sans doute le mouvement qui est le plus efficace lorsqu\'il s\'agit de travailler les ischio-jambiers. De plus, il est très simple puisqu\'il suffit de s’asseoir sur la chaise à leg curl, de caler les jambes entre les deux supports et d\'essayer de fléchir les genoux à 90 degrés. Puis, il faut contrôler le poids lorsque les jambes remontent. Les poignées, situées sur le côté de l\'appareil, permettent de conserver une bonne stabilité. ', '2022-08-14 19:36:53', NULL),
(99, 'Les Burpees', 'Lundi soir, 18 heures. Tous les vélos occupés et plus une place sur \n  les rameurs. Me voila bien embêté ! Comment vais-je donc pouvoir \n  m’échauffer ? Etant actuellement dans la mouvance « \n  Crossfit », pourquoi ne pas des Burpees pour changer !?', '2022-08-14 19:36:53', NULL),
(100, 'Soulevé de terre roumain', 'Cet exercice de musculation développe tout le corps. Il s\'agit ici d\'une \r\n  variante du soulevé de terre classique. En tant qu\'exercice poly articulaire qui sollicite beaucoup de masse musculaire, \r\n  il vous permettra gagner pas mal de muscle au niveau de la chaîne \r\n  postérieure.', '2022-08-14 19:36:53', NULL),
(101, 'Soulevé de terre jambes tendues', 'Cet exercice de musculation développe tout le corps, particulièrement \r\n  les fessiers, l\'arrière des cuisses et les lombaires. C\'est un exercice \r\n  technique qui nécessite pas mal de souplesse. \r\n  Le soulevé de terre jambes tendues est un exercice presque identique au soulevé de terre roumain. \r\n  Pour le soulevé de terre jambes tendues, les jambes sont moins \r\n  écartées - d\'environ la largeur du bassin - et elles sont presque tendues.', '2022-08-14 19:36:53', NULL),
(102, 'Adducteurs assis à la machine', 'L’exercice des adducteurs assis à la machine permet de muscler l’intérieur des cuisses. C’est un mouvement d’isolation apprécié des femmes qui cherchent à tonifier et galber leurs jambes. Mais, il intéresse aussi les pratiquants de certaines disciplines comme le football, le ski ou le surf. ', '2022-08-14 19:36:53', NULL),
(103, 'Sissy squat', 'Cet exercice de musculation sollicite les quadriceps, les muscles situés \r\n  sur le bas de la cuisse. C\'est un exercice de finition que vous pouvez \r\n  utiliser en fin de séance. Vous pouvez l’exécuter sur une machine prévue \r\n  pour ou sans, comme sur la démonstration. Il peut remplacer l\'exercice \r\n  de leg-extension. Il permet d\'accentuer le travail du droit antérieur par un étirement important.', '2022-08-14 19:36:53', NULL),
(104, 'Abducteurs assis à la machine', 'L’exercice des abducteurs assis à la machine est un mouvement d’isolation qui permet de travailler les abducteurs et le fessier. Ce n’est pas un mouvement indispensable car ces muscles sont déjà fortement sollicités par des exercices basiques \r\n	comme le squat ou la presse à cuisses, mais il peut servir de finition pour les personnes qui cherchent à se focaliser sur cette zone anatomique.', '2022-08-14 19:36:53', NULL),
(105, 'Fentes avec haltères', 'Les fentes avant galbent et musclent les cuisses et les fessiers. Très \r\n  pratiquées en salle de musculation, les fentes ne permettent pas d’utiliser \r\n  de lourdes charges et nécessitent un certain temps d’adaptation pour obtenir un bon équilibre.', '2022-08-14 19:36:53', NULL),
(106, 'Leg extension', 'Cet exercice de musculation sollicite les muscles du bas de la cuisse. \r\n  C\'est un exercice d’isolation pour le quadriceps qui termine en général la \r\n  séance de cuisses. Il ne vaut pas le \r\n  squat mais permet de travailler les cuisses sans solliciter \r\n  les fessiers et dos. En revanche, il impose un grand stress au niveau du \r\n  genou et ne peut donc pas convenir aux personnes ayant des problèmes au niveau \r\n  de cette articulation.', '2022-08-14 19:36:53', NULL),
(107, 'Front squat barre', 'Le front squat barre ou squat avant est une variante du mouvement de squat classique. Pendant cet exercice, la barre est posée sur l’avant des deltoïdes et non au niveau des trapèzes. Le front squat a l’avantage de mieux cibler les quadriceps (partie basse du muscle) et il permet d’utiliser une charge plus faible, ce qui peut soulager les lombaires. De plus, il est moins dangereux pour les genoux. Cependant, le maintien de la barre peut être plus difficile et elle a tendance à vous tirer vers l’avant.', '2022-08-14 19:36:53', NULL),
(108, 'Soulevé de terre', 'Cet exercice de musculation de base développe tout le corps et permet de gagner \r\n  beaucoup de force. Rien ne vaut le soulevé de terre ou « \r\n  Deadlift » pour prendre de la masse, à part peut être le \r\n  squat ! Il \r\n  travaille les quadriceps, les arrière cuisses, les fessiers, le dos, les \r\n  mollets, les abdos, les lombaires, les trapèzes et même les avant-bras. \r\n  Pour certains, il est indispensable si l\'on veut se forger un physique solide et massif \r\n  ; pour d\'autres, il est trop risqué et remplaçable par d’autres exercices. \r\n  Le soulevé de terre déchaîne les passions, et tout le monde a un avis sur la \r\n  question.', '2022-08-14 19:36:53', NULL),
(109, 'Jump squat poids du corps', 'Le Jump squat, comme son nom l\'indique, est un exercice qui mélange \r\n	le squat à un saut vertical. C\'est un exercice intéressant pour travailler les jambes et développer l\'explosivité, la détente et la vitesse, mais aussi l\'équilibre et la mobilité. C\'est aussi un exercice qui peut améliorer les capacités cardio-vasculaires car il demande beaucoup de ressources.', '2022-08-14 19:36:53', NULL),
(110, 'Développé avec haltères', 'Cet exercice de musculation sollicite les muscles des épaules, et \r\n	indirectement les triceps – à l\'arrière des bras – et le haut des pectoraux. \r\n	C’est un exercice de base, idéal pour prendre de la masse, de l\'épaisseur et construire \r\n	des épaules massives.', '2022-08-14 19:36:53', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Structure de la table `muscle_groups`
--

DROP TABLE IF EXISTS `muscle_groups`;
CREATE TABLE IF NOT EXISTS `muscle_groups` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'L''identifiant du groupe musculaire',
  `name` varchar(64) NOT NULL COMMENT 'Le nom du groupe musculaire',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'La date de création du groupe musculaire',
  `updated_at` timestamp NULL DEFAULT NULL COMMENT 'La date de la dernière mise à jour du groupe musculaire',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `muscle_groups`
--

INSERT INTO `muscle_groups` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Abdominaux', '2022-08-14 19:36:53', NULL),
(2, 'Pectoraux', '2022-08-14 19:36:53', NULL),
(3, 'Dos', '2022-08-14 19:36:53', NULL),
(4, 'Épaules', '2022-08-14 19:36:53', NULL),
(5, 'Biceps', '2022-08-14 19:36:53', NULL),
(6, 'Triceps', '2022-08-14 19:36:53', NULL),
(7, 'Avant-bras', '2022-08-14 19:36:53', NULL),
(8, 'Cuisses', '2022-08-14 19:36:53', NULL),
(9, 'Mollets', '2022-08-14 19:36:53', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `rel_exercises_musclegroups`
--

DROP TABLE IF EXISTS `rel_exercises_musclegroups`;
CREATE TABLE IF NOT EXISTS `rel_exercises_musclegroups` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'L''identifiant de la relation',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'La date de création de l''affectation d''un groupe musculaire à un exercice',
  `updated_at` timestamp NULL DEFAULT NULL COMMENT 'La date de la dernière mise à jour de de l''affectation d''un groupe musculaire à un exercice',
  `exercise_id` int(10) UNSIGNED NOT NULL,
  `muscle_group_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_rel_exercises` (`exercise_id`),
  KEY `FK_rel_musclegroups` (`muscle_group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `rel_exercises_musclegroups`
--

INSERT INTO `rel_exercises_musclegroups` (`id`, `created_at`, `updated_at`, `exercise_id`, `muscle_group_id`) VALUES
(1, '2022-08-14 19:36:53', NULL, 1, 1),
(2, '2022-08-14 19:36:53', NULL, 2, 1),
(3, '2022-08-14 19:36:53', NULL, 3, 1),
(4, '2022-08-14 19:36:53', NULL, 4, 1),
(5, '2022-08-14 19:36:53', NULL, 5, 1),
(6, '2022-08-14 19:36:53', NULL, 6, 3),
(7, '2022-08-14 19:36:53', NULL, 7, 3),
(8, '2022-08-14 19:36:53', NULL, 8, 1),
(9, '2022-08-14 19:36:53', NULL, 9, 1),
(10, '2022-08-14 19:36:53', NULL, 10, 1),
(11, '2022-08-14 19:36:53', NULL, 11, 1),
(12, '2022-08-14 19:36:53', NULL, 12, 1),
(13, '2022-08-14 19:36:53', NULL, 13, 1),
(14, '2022-08-14 19:36:53', NULL, 14, 8),
(15, '2022-08-14 19:36:53', NULL, 15, 8),
(16, '2022-08-14 19:36:53', NULL, 16, 8),
(17, '2022-08-14 19:36:53', NULL, 17, 8),
(18, '2022-08-14 19:36:53', NULL, 18, 8),
(19, '2022-08-14 19:36:53', NULL, 19, 8),
(20, '2022-08-14 19:36:53', NULL, 20, 1),
(21, '2022-08-14 19:36:53', NULL, 21, 1),
(22, '2022-08-14 19:36:53', NULL, 22, 1),
(23, '2022-08-14 19:36:53', NULL, 23, 1),
(24, '2022-08-14 19:36:53', NULL, 24, 1),
(25, '2022-08-14 19:36:53', NULL, 25, 2),
(26, '2022-08-14 19:36:53', NULL, 26, 3),
(27, '2022-08-14 19:36:53', NULL, 27, 3),
(28, '2022-08-14 19:36:53', NULL, 28, 2),
(29, '2022-08-14 19:36:53', NULL, 29, 3),
(30, '2022-08-14 19:36:53', NULL, 30, 3),
(31, '2022-08-14 19:36:53', NULL, 31, 4),
(32, '2022-08-14 19:36:53', NULL, 32, 9),
(33, '2022-08-14 19:36:53', NULL, 33, 2),
(34, '2022-08-14 19:36:53', NULL, 34, 3),
(35, '2022-08-14 19:36:53', NULL, 35, 3),
(36, '2022-08-14 19:36:53', NULL, 36, 5),
(37, '2022-08-14 19:36:53', NULL, 37, 4),
(38, '2022-08-14 19:36:53', NULL, 38, 2),
(39, '2022-08-14 19:36:53', NULL, 39, 6),
(40, '2022-08-14 19:36:53', NULL, 40, 6),
(41, '2022-08-14 19:36:53', NULL, 41, 3),
(42, '2022-08-14 19:36:53', NULL, 42, 3),
(43, '2022-08-14 19:36:53', NULL, 43, 9),
(44, '2022-08-14 19:36:53', NULL, 44, 4),
(45, '2022-08-14 19:36:53', NULL, 45, 3),
(46, '2022-08-14 19:36:53', NULL, 46, 2),
(47, '2022-08-14 19:36:53', NULL, 47, 4),
(48, '2022-08-14 19:36:53', NULL, 48, 4),
(49, '2022-08-14 19:36:53', NULL, 49, 3),
(50, '2022-08-14 19:36:53', NULL, 50, 4),
(51, '2022-08-14 19:36:53', NULL, 51, 5),
(52, '2022-08-14 19:36:53', NULL, 52, 5),
(53, '2022-08-14 19:36:53', NULL, 53, 7),
(54, '2022-08-14 19:36:53', NULL, 54, 2),
(55, '2022-08-14 19:36:53', NULL, 55, 2),
(56, '2022-08-14 19:36:53', NULL, 56, 5),
(57, '2022-08-14 19:36:53', NULL, 57, 2),
(58, '2022-08-14 19:36:53', NULL, 58, 5),
(59, '2022-08-14 19:36:53', NULL, 59, 7),
(60, '2022-08-14 19:36:53', NULL, 60, 6),
(61, '2022-08-14 19:36:53', NULL, 61, 7),
(62, '2022-08-14 19:36:53', NULL, 62, 4),
(63, '2022-08-14 19:36:53', NULL, 64, 5),
(64, '2022-08-14 19:36:53', NULL, 65, 6),
(65, '2022-08-14 19:36:53', NULL, 66, 9),
(66, '2022-08-14 19:36:53', NULL, 67, 5),
(67, '2022-08-14 19:36:53', NULL, 68, 3),
(68, '2022-08-14 19:36:53', NULL, 69, 2),
(69, '2022-08-14 19:36:53', NULL, 70, 4),
(70, '2022-08-14 19:36:53', NULL, 71, 2),
(71, '2022-08-14 19:36:53', NULL, 72, 5),
(72, '2022-08-14 19:36:53', NULL, 73, 7),
(73, '2022-08-14 19:36:53', NULL, 74, 2),
(74, '2022-08-14 19:36:53', NULL, 75, 2),
(75, '2022-08-14 19:36:53', NULL, 76, 4),
(76, '2022-08-14 19:36:53', NULL, 77, 3),
(77, '2022-08-14 19:36:53', NULL, 78, 9),
(78, '2022-08-14 19:36:53', NULL, 79, 2),
(79, '2022-08-14 19:36:53', NULL, 80, 5),
(80, '2022-08-14 19:36:53', NULL, 81, 7),
(81, '2022-08-14 19:36:53', NULL, 82, 3),
(82, '2022-08-14 19:36:53', NULL, 83, 2),
(83, '2022-08-14 19:36:53', NULL, 84, 2),
(84, '2022-08-14 19:36:53', NULL, 85, 2),
(85, '2022-08-14 19:36:53', NULL, 86, 5),
(86, '2022-08-14 19:36:53', NULL, 87, 4),
(87, '2022-08-14 19:36:53', NULL, 88, 2),
(88, '2022-08-14 19:36:53', NULL, 89, 3),
(89, '2022-08-14 19:36:53', NULL, 90, 2),
(90, '2022-08-14 19:36:53', NULL, 91, 5),
(91, '2022-08-14 19:36:53', NULL, 92, 6),
(92, '2022-08-14 19:36:53', NULL, 93, 2),
(93, '2022-08-14 19:36:53', NULL, 94, 1),
(94, '2022-08-14 19:36:53', NULL, 95, 1),
(95, '2022-08-14 19:36:53', NULL, 96, 1),
(96, '2022-08-14 19:36:53', NULL, 97, 8),
(97, '2022-08-14 19:36:53', NULL, 98, 8),
(98, '2022-08-14 19:36:53', NULL, 99, 8),
(99, '2022-08-14 19:36:53', NULL, 100, 8),
(100, '2022-08-14 19:36:53', NULL, 101, 8),
(101, '2022-08-14 19:36:53', NULL, 102, 8),
(102, '2022-08-14 19:36:53', NULL, 103, 8),
(103, '2022-08-14 19:36:53', NULL, 104, 8),
(104, '2022-08-14 19:36:53', NULL, 105, 8),
(105, '2022-08-14 19:36:53', NULL, 106, 8),
(106, '2022-08-14 19:36:53', NULL, 107, 8),
(107, '2022-08-14 19:36:53', NULL, 108, 8),
(108, '2022-08-14 19:36:53', NULL, 109, 8),
(109, '2022-08-14 19:36:53', NULL, 110, 4);

-- --------------------------------------------------------

--
-- Structure de la table `rel_trainings_tags`
--

DROP TABLE IF EXISTS `rel_trainings_tags`;
CREATE TABLE IF NOT EXISTS `rel_trainings_tags` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'L''identifiant de la relation',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'La date de création de l''affectation d''un tag à un entrainement',
  `updated_at` timestamp NULL DEFAULT NULL COMMENT 'La date de la dernière mise à jour de de l''affectation d''un tag à un entrainement',
  `training_id` int(10) UNSIGNED NOT NULL,
  `tag_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_rel_trainings` (`training_id`),
  KEY `FK_rel_tags` (`tag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `rel_trainings_tags`
--

INSERT INTO `rel_trainings_tags` (`id`, `created_at`, `updated_at`, `training_id`, `tag_id`) VALUES
(3, '2022-08-16 20:22:40', NULL, 3, 2),
(57, '2022-08-18 17:12:25', NULL, 40, 4),
(58, '2022-08-18 17:12:25', NULL, 40, 6),
(59, '2022-08-18 17:12:25', NULL, 40, 9);

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'L''identifiant de la séance',
  `name` varchar(64) NOT NULL COMMENT 'Le nom de la séance',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'La date de création de la séance',
  `updated_at` timestamp NULL DEFAULT NULL COMMENT 'La date de la dernière mise à jour de la séance',
  `training_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_sessions_trainings` (`training_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `sessions`
--

INSERT INTO `sessions` (`id`, `name`, `created_at`, `updated_at`, `training_id`) VALUES
(6, 'abdos', '2022-08-19 09:45:23', NULL, 3);

-- --------------------------------------------------------

--
-- Structure de la table `sets`
--

DROP TABLE IF EXISTS `sets`;
CREATE TABLE IF NOT EXISTS `sets` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'L''identifiant de la statistique',
  `set_number` int(10) UNSIGNED NOT NULL COMMENT 'Numéro de la série',
  `repetitions` int(10) UNSIGNED NOT NULL COMMENT 'Nombre de répétitions',
  `weight` int(10) UNSIGNED NOT NULL COMMENT 'Poids',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'La date de création de la statistique',
  `updated_at` timestamp NULL DEFAULT NULL COMMENT 'La date de la dernière mise à jour de la statistique',
  `training_id` int(10) UNSIGNED NOT NULL,
  `exercise_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_sets_trainings` (`training_id`),
  KEY `FK_sets_exercises` (`exercise_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `statistics`
--

DROP TABLE IF EXISTS `statistics`;
CREATE TABLE IF NOT EXISTS `statistics` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'L''identifiant de la statistique',
  `set_number` int(10) UNSIGNED NOT NULL COMMENT 'Numéro de la série',
  `repetitions` int(10) UNSIGNED NOT NULL COMMENT 'Nombre de répétitions',
  `weight` int(10) UNSIGNED NOT NULL COMMENT 'Poids',
  `score` int(10) UNSIGNED DEFAULT NULL COMMENT 'Note',
  `comment` varchar(255) DEFAULT NULL COMMENT 'Commentaire',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'La date de création de la statistique',
  `updated_at` timestamp NULL DEFAULT NULL COMMENT 'La date de la dernière mise à jour de la statistique',
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `exercise_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_statistics_users` (`user_id`),
  KEY `FK_statistics_exercises` (`exercise_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `tags`
--

DROP TABLE IF EXISTS `tags`;
CREATE TABLE IF NOT EXISTS `tags` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'L''identifiant du tag',
  `name` varchar(64) NOT NULL COMMENT 'Le nom du tag',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'La date de création du tag',
  `updated_at` timestamp NULL DEFAULT NULL COMMENT 'La date de la dernière mise à jour du tag',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `tags`
--

INSERT INTO `tags` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'pec', '2022-08-16 22:21:03', NULL),
(2, 'Biceps', '2022-08-16 22:21:31', NULL),
(3, 'lundi', '2022-08-18 06:20:50', NULL),
(4, 'mardi', '2022-08-18 06:20:50', NULL),
(5, 'mercredi', '2022-08-18 06:20:50', NULL),
(6, 'jeudi', '2022-08-18 06:20:50', NULL),
(7, 'vendredi', '2022-08-18 06:20:50', NULL),
(8, 'samedi', '2022-08-18 06:20:50', NULL),
(9, 'dimanche', '2022-08-18 06:20:50', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `trainings`
--

DROP TABLE IF EXISTS `trainings`;
CREATE TABLE IF NOT EXISTS `trainings` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'L''identifiant de l''entrainement',
  `name` varchar(64) NOT NULL COMMENT 'Le nom de l''entrainement',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'La date de création de l''entrainement',
  `updated_at` timestamp NULL DEFAULT NULL COMMENT 'La date de la dernière mise à jour de l''entrainement',
  `user_id` bigint(20) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_trainings_users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `trainings`
--

INSERT INTO `trainings` (`id`, `name`, `created_at`, `updated_at`, `user_id`) VALUES
(3, 'Full body', '2022-08-14 21:58:32', NULL, 4),
(40, 'seche', '2022-08-18 15:12:25', '2022-08-18 15:12:25', 2),
(49, 'test123', '2022-08-19 13:27:36', '2022-08-19 13:48:15', 2);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'musclay', 'musclay@example.com', NULL, '$2y$10$OwhEajU6zKyZYRJiFme2.Om1B3wIloo2nWavR5SBasf2a01jmXEJ2', NULL, '2022-08-14 09:55:40', '2022-08-14 09:55:40'),
(2, 'yusuf', 'yusuf@example.com', NULL, '$2y$10$niEN7LIcSKK7o0ZsLCYaieyalOz3loJKVM1au6ICsooSU6A3r3KZy', NULL, '2022-08-14 19:33:40', '2022-08-14 19:33:40'),
(3, 'Frédéric', 'Frédéric@example.com', NULL, '$2y$10$kUobc4Hx1AX.FisEgkhU6uFYflFrD9qr6BevOchJy7/dPZaJOPkIa', NULL, '2022-08-15 05:42:27', '2022-08-15 05:42:27'),
(4, 'Yassine', 'Yassine@example.com', NULL, '$2y$10$rABG/nBQNB21SE9y8.Um8eVYdMYSWj1EYKRDdvpvvbgIYpUl1gOh2', NULL, '2022-08-15 07:06:28', '2022-08-15 07:06:28');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `rel_exercises_musclegroups`
--
ALTER TABLE `rel_exercises_musclegroups`
  ADD CONSTRAINT `FK_rel_exercises` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`id`),
  ADD CONSTRAINT `FK_rel_musclegroups` FOREIGN KEY (`muscle_group_id`) REFERENCES `muscle_groups` (`id`);

--
-- Contraintes pour la table `rel_trainings_tags`
--
ALTER TABLE `rel_trainings_tags`
  ADD CONSTRAINT `FK_rel_tags` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_rel_trainings` FOREIGN KEY (`training_id`) REFERENCES `trainings` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `FK_sessions_trainings` FOREIGN KEY (`training_id`) REFERENCES `trainings` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `sets`
--
ALTER TABLE `sets`
  ADD CONSTRAINT `FK_sets_exercises` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_sets_trainings` FOREIGN KEY (`training_id`) REFERENCES `trainings` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `statistics`
--
ALTER TABLE `statistics`
  ADD CONSTRAINT `FK_statistics_exercises` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`id`),
  ADD CONSTRAINT `FK_statistics_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `trainings`
--
ALTER TABLE `trainings`
  ADD CONSTRAINT `FK_trainings_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

SET foreign_key_checks = 1;