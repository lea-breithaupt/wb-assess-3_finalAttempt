import express from 'express';
import session from 'express-session';
import lodash from 'lodash';
import morgan from 'morgan';
import nunjucks from 'nunjucks';
import ViteExpress from 'vite-express';

const app = express();
const port = '8000';

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: false }));

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

const MOST_LIKED_FOSSILS = {
  aust: {
    img: '/img/australopith.png',
    name: 'Australopithecus',
    num_likes: 584,
  },
  quetz: {
    img: '/img/quetzal_torso.png',
    name: 'Quetzal',
    num_likes: 587,
  },
  steg: {
    img: '/img/stego_skull.png',
    name: 'Stegosaurus',
    num_likes: 598,
  },
  trex: {
    img: '/img/trex_skull.png',
    name: 'Tyrannosaurus Rex',
    num_likes: 601,
  },
};

const OTHER_FOSSILS = [
  {
    img: '/img/ammonite.png',
    name: 'Ammonite',
  },
  {
    img: '/img/mammoth_skull.png',
    name: 'Mammoth',
  },
  {
    img: '/img/ophthalmo_skull.png',
    name: 'Opthalmosaurus',
  },
  {
    img: '/img/tricera_skull.png',
    name: 'Triceratops',
  },
];

// TODO: Replace this comment with your code
app.get('/top-fossils', (req, res) => {
  if(req.session.name) {
    res.render('top-fossils.html.njk', { 
      likedFossils: MOST_LIKED_FOSSILS,
      name: req.session.name
    })
  } else {
    res.redirect('/')
  }
})

app.get('/', (req, res) => {
  if(req.session.name) {
    res.redirect('/top-fossils')
  } else {
    res.render('homepage.html.njk')
  }
})

app.get('/get-name', (req, res) => {
  const name = req.query.name
  req.session.name = name
  res.redirect('/top-fossils')
})

app.post('/like-fossil', (req, res) => {
  const likedFossilId = req.body.fossilId
  if(MOST_LIKED_FOSSILS[likedFossilId]){
    MOST_LIKED_FOSSILS[likedFossilId].num_likes += 1
  }
  res.render('thank-you.html.njk', {
    name: req.session.name
  })
})

app.get('/random-fossil.json', (req, res) => {
  const randomFossil = lodash.sample(OTHER_FOSSILS);
  res.json(randomFossil);
});

ViteExpress.listen(app, port, () => {
  console.log(`Server running on http://localhost:${port}...`);
});
