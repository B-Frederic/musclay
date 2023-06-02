import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';

const faqContent = [
  {
    question: 'Quel est l\'objectif de cette application ?',
    answer: 'Cette application permet aux pratiquants de musculation de créer et d\'organiser leurs entraînements et de suivre leurs progressions.',
  },
  {
    question: 'Puis-je utiliser l\'application sans compte ?',
    answer: 'Vous pouvez utiliser notre application sans compte et la tester à votre guise. Cependant vous serez limitée à 2 entraînements maximum. Vous n\'aurez pas accès non plus à la partie stats et donc vos données ne seront pas enregistrées.',
  },
  {
    question: 'Pourquoi est-il préférable d\'utiliser un compte utilisateur ?',
    answer: 'Le compte utilisateur permet de sauvegarder vos entraînements et d\'accéder à la page des statistiques pour suivre vos performances. Si vous ne possédez pas de compte, vous ne pourrez pas créer plus de 2 entraînements et les données ne seront pas sauvegardées.',
  },
  {
    question: 'Je me suis inscrit mais je n\'ai pas reçu mon e-mail de vérification lorsque je rentre mes identifiants, comment faire ?',
    answer: 'Vérifiez dans un premier temps vos spams dans votre boîte e-mail, sinon vous pouvez cliquer sur le lien dans le pop-up qui vous permet de générer à nouveau un mail de vérification.',
  },
  {
    question: 'Puis-je me connecter avec mon compte Google ?',
    answer: 'Bien sûr, vous avez l\'authentification de connexion Google à votre disposition.',
  },
  {
    question: 'Si je me connecte avec mon compte Google, mes données de progression lors de mes séances sont-elles sauvegardées ?',
    answer: 'Tout à fait, vos données de progression sont enregistrées même avec votre compte Google.',
  },
  {
    question: 'J\'ai oublié mon mot de passe, comment faire ?',
    answer: 'Un lien "mot de passe oublié" est à votre disposition sur la page de connexion, il vous renverra sur un formulaire pour recréer un nouveau mot de passe.',
  },
  {
    question: 'J\'utilise le site sans m\'enregistrer et je n\'ai pas accès au "Profil" ni au "Stats", pourquoi ?',
    answer: 'Vous devez être enregistré pour accéder à ces parties-là et pouvoir changer votre photo d\'avatar, votre pseudo et enregistrer vos données pour suivre votre pregression.',
  },
  {
    question: 'Modifier son pseudo et son avatar ?',
    answer: 'Vous pouvez ajouter une photo/image et cliquer sur "Envoyer" pour que la modification soit prise en compte. Pour le pseudo il vous suffit d\'entrer un nouveau pseudo et de cliquer sur "Mettre à jour mes données" si vous utilisez un compte Google, si vous utilisez un compte créé sur notre site, il vous faudra confirmer votre mot de passe avant de cliquer sur "Mettre à jour mes données".',
  },
  {
    question: 'Je souhaite ne plus avoir d\'avatar, comment faire ?',
    answer: 'Un bouton "Supprimer mon avatar" est disponible dans "Profil".',
  },
  {
    question: 'Je souhaite supprimer mon compte, comment faire ?',
    answer: 'Un bouton "Supprimer mon compte" est disponible dans "Profil".',
  },
  {
    question: 'Je veux créer un entraînement, comment faire ?',
    answer: 'Il vous suffit d\'aller dans "Entraînements" dans le menu de navigation et de cliquer sur "Créer un entraînement". Vous pouvez choisir le nom que vous voulez et y ajouter un ou plusieurs Tags de votre choix.',
  },
  {
    question: 'A quoi sert les "Tags" lors de la création d\'un entraînement ?',
    answer: 'Cela vous permez de personnaliser la création et de filtrer selon le Tag de l\'entraînement que vous aurez choisis au préalable.',
  },
  {
    question: 'L\'entraînement est créé. J\'aimerais ajouter des exercices, que dois-je faire ?',
    answer: 'Il vous suffit pour cela de cliquer sur "Ajouter un exercice". Vous pourrez alors choisir un ou plusieurs exercices dans la liste, l\'ajouter en cliquant sur le "+" ou le retirer en cliquant sur le "-". Une fois fait, cliquer sur "Valider" en haut à droite.',
  },
  {
    question: 'Mes exercices sont disponible, que dois-je faire ?',
    answer: 'Cliquer sur l\'exercice pour qu\'il se déplis et entrez dans les cases prévues à cet effet le poids et le nombre de répétition prévu pour cet exercice. Une fois fait, cliquer sur "Enregistrer la séance" pour sauvegarder vos données d\'exercices.',
  },
  {
    question: 'Je n\'ai qu\'une série de disponible dans mes exercices ?',
    answer: 'Non ne vous inquiétez pas, il vous suffit de cliquer sur "Ajouter une série" pour en créer autant que vous voulez. A l\'ajout, elle prendra en compte la dernière valeur entrée pour vous faciliter une partie du remplissage. Pour retirer une série il vous suffit de cliquer sur le "-".',
  },
  {
    question: 'Si je retire la seule série de mon exercice, que se passera-t-il ?',
    answer: 'L\'exercice serra alors supprimé automatiquement. Pas d\'inquiétude vous pourrez toujours l\'ajouter de nouveau en cliquant sur "Ajouter un exercice".',
  },
  {
    question: 'Le bouton "Valider" dans la configuration des exercices sert à quoi ?',
    answer: 'Il vous permet de replier la carte une fois que vous cliquez dessus. Cela vous permet, après avoir bien vérifié de ne plus vous en préoccuper et de passer à la suivante.',
  },
  {
    question: 'Le bouton "Enregistrer ma séance" dans la configuration des exercices sert à quoi ?',
    answer: 'Il vous permet de sauvegarder toutes les données des exercices que vous retrouverez lors de la partie "Entraînements".',
  },
  {
    question: 'J\'ai finis d\'enregistrer ma séance, comment la lancer ?',
    answer: 'Vous êtes directement redirigé dans "Entraînements", il vous suffit juste de cliquer sur "S\'entraîner" dans l\'entraînement que vous désirez lancer.',
  },
  {
    question: 'A quoi sert le chrono a côté du titre de mon entraînement lors de ma séance ?',
    answer: 'Cela vous permet de configurer le temps de repos que vous souhaitez. Il est possible de le configurer aussi en cliquant sur "1:00" à côté des boutons play et pause.',
  },
  {
    question: 'Lors de mes séries d\'exercices, à quoi sert la case "Valider" ?',
    answer: 'Cela vous permez de cocher la série qui a été faite et d\'automatiquement lancer le chrono que vous pouvez configurer au préalable (voir réponse FAQ précédente). Si vous la décochez de nouveau, le temps du chrono se rénitialisera.',
  },
  {
    question: 'A quoi sert la partie "Note" et "Commentaire" de mes exercices ?',
    answer: 'Cela vous permez de vous garder une trace de votre ressenti et note de l\'exercice ce jour-là. Ils seront disponibles dans les cartes des stats.',
  },
  {
    question: 'Le bouton "Valider" à la fin de mon exercice sert à quoi ?',
    answer: 'Il vous permet de clôturer votre exercice et le repli.',
  },
  {
    question: 'A quoi sert le bouton "Enregistrer la séance" une fois mes séries et exercices finis ?',
    answer: 'Cela sauvegarde vos données de progression, vos résultats seront directement envoyés dans la partie stats et vous y retrouverez vos entraînements et le graphique.',
  },
  {
    question: 'Pourquoi le graphique ne s\'affiche dans la page des statistiques ?',
    answer: 'Il faut au préalable filtrer sur un exercice pour que le graphique s\'affiche.',
  },
  {
    question: 'Pourquoi je ne retrouve pas les données d\'une de mes séances dans mes statistiques ?',
    answer: 'Vérifiez que votre séance est bien dans l\'intervalle de date sélectionné dans les filtres dans le haut de la page.',
  },
  {
    question: 'A quoi sert le tri dans les stats ?',
    answer: 'Cela vous permez de trier par ordre croissant ou décroissant vos cartes d\'entraînement selon les dates choisies.',
  },
  {
    question: 'Existe-t-il une version android ou IOS ?',
    answer: 'L\'application web a été conçu pour s\'afficher parfaitement sur un mobile néanmoins il ne s\'agit pas d\'une application mobile. Nous prévoyons de développer une version android et IOS dans un futur proche.',
  },
  {
    question: 'Pourquoi une telle application ?',
    answer: 'Celle-ci a été développé par des passionnés de développement et de musculation.',
  },
  {
    question: 'Puis-je vous contactez pour quelconques améliorations et/ou propositions ?',
    answer: 'Avec plaisir, vous trouverez le formulaire de contact dans "Contact".',
  },
  {
    question: 'Puis-je soutenir ce projet et ses futurs ajouts ?',
    answer: 'Oui, dans "A propos" vous trouverez un lien pour nous faire un ou plusieurs dons (BuyMeaCoffee). L\'équipe vous remercie d\'avance pour votre contribution et votre soutien.',
  },
];

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

function FaqPage() {
  const [expanded, setExpanded] = React.useState('panel0');

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [searchFaq, setSearchFaq] = React.useState(faqContent);

  const handleSearchFaq = (input) => {
    const newArray = faqContent.filter((faq) => (faq.question.toUpperCase().includes(input.toUpperCase()) || faq.answer.toUpperCase().includes(input.toUpperCase())));
    setSearchFaq(newArray);
  };

  return (
    <div className="container">
      <Box sx={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '80%', mb: '50px',
      }}
      >
        <Typography component="h2" variant="h2" sx={{ m: 3 }}>FAQ</Typography>
        <TextField
          sx={{ mx: 'auto', mb: '20px', width: { md: '350px', xs: '250px' } }}
          id="outlined-search"
          label="Recherche"
          type="search"
          onChange={(event) => handleSearchFaq(event.currentTarget.value)}
        />
        {searchFaq.map((faq, index) => (
          <Accordion sx={{ mb: '10px', borderRadius: '15px' }} key={faq.question} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
            <AccordionSummary sx={{ borderRadius: '15px' }} aria-controls={`panel${index}d-content`} id={`panel${index}d-header`}>
              <Typography>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ border: 'none' }}>
              <Typography textAlign="justify">
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </div>
  );
}

export default FaqPage;
