// 1.1 dependencies declaration section
require('dotenv').config()

const express =require('express')

const app = express()

const path = require('node:path')

const morgan = require('morgan')

const session = require('express-session')

const passport = require('passport')

// const { request } = require('http')

const PORT = 3000

// const data = require('./data/data')

const methodOverride = require('method-override');

const routes = require('./routes/index-routes')

// 1.2 data for EJS
// const comicInventory = [
//     {
//         _id: '001',
//         title: "Fun Home: A Family Tragicomic",
//         image: "fun-home.jpg",
//         author: "Alison Bechdel",
//         publisher: "Mariner Books",
//         genre: "memoire",
//         number_of_pages: "232",
//         starRating: 5,
//         synopsis: "In this graphic memoir, Alison Bechdel charts her fraught relationship with her late father.Distant and exacting, Bruce Bechdel was an English teacher and director of the town funeral home, which Alison and her family referred to as the Fun Home. It was not until college that Alison, who had recently come out as a lesbian, discovered that her father was also gay. A few weeks after this revelation, he was dead, leaving a legacy of mystery for his daughter to resolve."
//     },
//     {
//         _id: '002',
//         title: "Watchmen",
//         image: "watchmen.jpg",
//         author: "Alan Moore",
//         publisher: "DC Comics",
//         genre: "superhero",
//         number_of_pages: "416",
//         starRating: 5,
//         synopsis: "This Hugo Award-winning graphic novel chronicles the fall from grace of a group of super-heroes plagued by all-too-human failings. Along the way, the concept of the super-hero is dissected as the heroes are stalked by an unknown assassin. One of the most influential graphic novels of all time and a perennial best-seller, Watchmen has been studied on college campuses across the nation and is considered a gateway title, leading readers to other graphic novels such as V for Vendetta, Batman: The Dark Knight Returns, and The Sandman series."
//     },
//     {
//         _id: '003',
//         title: "Hunter X Hunter Vol. 1",
//         image: "hunter-x-hunter.jpg",
//         author: "Yoshihiro Togashi",
//         publisher: "VIZ Media LLC",
//         genre: "manga",
//         number_of_pages: "184",
//         starRating: 5,
//         synopsis: "Hunters are a special breed, dedicated to tracking down treasures, magical beasts, and even other people. But such pursuits require a license, and less than one in a hundred thousand can pass the grueling qualification exam. Those who do pass gain access to restricted areas, amazing stores of information, and the right to call themselves Hunters. Gon might be a country boy, but he has high aspirations. Despite his Aunt Mito's protests, Gon decides to follow in his father's footsteps and become a legendary Hunter. The Hunter hopefuls begin their journey by storm-tossed ship, where Gon meets Leorio and Kurapika, the only other applicants who aren't devastated by bouts of seasickness. Having survived the terrors of the high seas, Gon and his companions now have to prove their worth in a variety of tests in order to find the elusive Exam Hall. And once they get there, will they ever leave alive...?"
//     },
//     {
//         _id: '004',
//         title: "Lumberjanes Vol. 1",
//         image: "lumberjanes.jpg",
//         author: "Noelle Stevenson",
//         publisher: "BOOM! Box",
//         genre: "coming-of-age",
//         number_of_pages: "128",
//         starRating: 4,
//         synopsis: "At Miss Qiunzilla Thiskwin Penniquiqul Thistle Crumpet's camp for hard-core lady-types, things are not what they seem. Three-eyed foxes. Secret caves. Anagrams. Luckily, Jo, April, Mal, Molly, and Ripley are five rad, butt-kicking best pals determined to have an awesome summer together... And they're not gonna let a magical quest or an array of supernatural critters get in their way! The mystery keeps getting bigger, and it all begins here."
//     },
//     {
//         _id: '005',
//         title: "One Piece Vol. 1: Romance Dawn",
//         image: "one-piece.jpg",
//         author: "Eiichiro Oda",
//         publisher: "VIZ Media LLC",
//         genre: "manga",
//         number_of_pages: "210",
//         starRating: 5,
//         synopsis: "A new shonen sensation in Japan, this series features Monkey D. Luffy, whose main ambition is to become a pirate. Eating the Gum-Gum Fruit gives him strange powers but also invokes the fruit's curse: anybody who consumes it can never learn to swim. Nevertheless, Monkey and his crewmate Roronoa Zoro, master of the three-sword fighting style, sail the Seven Seas of swashbuckling adventure in search of the elusive treasure \"One Piece.\""
//     },
//     {
//         _id: '006',
//         title: "Wake: The Hidden History of Women-Led Slave Revolts",
//         image: "wake.jpg",
//         author: "Rebecca Hall",
//         publisher: "Simon Schuster",
//         genre: "nonfiction",
//         number_of_pages: "208",
//         starRating: 5,
//         synopsis: "Part graphic novel, part memoir, Wake is an imaginative tour-de-force that tells the story of women-led slave revolts and chronicles scholar Rebecca Hall’s efforts to uncover the truth about these women warriors who, until now, have been left off the historical record. Women warriors planned and led slave revolts on slave ships during the Middle Passage. They fought their enslavers throughout the Americas. And then they were erased from history. Wake tells the story of Dr. Rebecca Hall, a historian, granddaughter of slaves, and a woman haunted by the legacy of slavery. The accepted history of slave revolts has always told her that enslaved women took a back seat. But Rebecca decides to look deeper, and her journey takes her through old court records, slave ship captain’s logs, crumbling correspondence, and even the forensic evidence from the bones of enslaved women from the “negro burying ground” uncovered in Manhattan. She finds women warriors everywhere. Using in-depth archival research and a measured use of historical imagination, Rebecca constructs the likely pasts of Adono and Alele, women rebels who fought for freedom during the Middle Passage, as well as the stories of women who led slave revolts in Colonial New York. We also follow Rebecca’s own story as the legacy of slavery shapes life, both during her time as a successful attorney and later as a historian seeking the past that haunts her. Illustrated beautifully in black and white, Wake will take its place alongside classics of the graphic novel genre, like Marjane Satrapi’s Persepolis and Art Spiegelman’s Maus. The story of both a personal and national legacy, it is a powerful reminder that while the past is gone, we still live in its wake."
//     },
//     {
//         _id: '007',
//         title: "Black Panther: A Nation Under Our Feet Book 1",
//         image: "black-panther.jpg",
//         author: "Ta-Nehisi Coates",
//         publisher: "Marvel",
//         genre: "superhero",
//         number_of_pages: "144",
//         starRating: 3,
//         synopsis: "A new era begins for the Black Panther! MacArthur Genius and National Book Award-winning writer Ta-Nehisi Coates (Between the World and Me) takes the helm, confronting T'Challa with a dramatic upheaval in Wakanda that will make leading the African nation tougher than ever before. When a superhuman terrorist group that calls itself The People sparks a violent uprising, the land famed for its incredible technology and proud warrior traditions will be thrown into turmoil. If Wakanda is to survive, it must adapt--but can its monarch, one in a long line of Black Panthers, survive the necessary change? Heavy lies the head that wears the cowl!"
//     },
//     {
//         _id: '008',
//         title: "The Walking Dead, Vol. 1: Days Gone Bye",
//         image: "the-walking-dead.jpg",
//         author: "Robert Kirkman",
//         publisher: "Image Comics",
//         genre: "dystopian",
//         number_of_pages: "144",
//         starRating: 4,
//         synopsis: "The world we knew is gone. The world of commerce and frivolous necessity has been replaced by a world of survival and responsibility. An epidemic of apocalyptic proportions has swept the globe, causing the dead to rise and feed on the living. In a matter of months society has crumbled: no government, no grocery stores, no mail delivery, no cable TV. In a world ruled by the dead, the survivors are forced to finally start living."
//     },
//     {
//         _id: '009',
//         title: "March: Book One",
//         image: "march.jpg",
//         author: "John Lewis",
//         publisher: "Top Shelf Productions",
//         genre: "autobiography",
//         number_of_pages: "128",
//         starRating: 5,
//         synopsis: "March is a vivid first-hand account of John Lewis’ lifelong struggle for civil and human rights, meditating in the modern age on the distance traveled since the days of Jim Crow and segregation. Rooted in Lewis’ personal story, it also reflects on the highs and lows of the broader civil rights movement. Book One spans John Lewis’ youth in rural Alabama, his life-changing meeting with Martin Luther King, Jr., the birth of the Nashville Student Movement, and their battle to tear down segregation through nonviolent lunch counter sit-ins, building to a stunning climax on the steps of City Hall. Many years ago, John Lewis and other student activists drew inspiration from the 1950s comic book \"Martin Luther King and the Montgomery Story.\" Now, his own comics bring those days to life for a new audience, testifying to a movement whose echoes will be heard for generations."
//     },
//     {
//         _id: '010',
//         title: "Batman: The Dark Knight Returns",
//         image: "batman.jpg",
//         author: "Frank Miller",
//         publisher: "DC Comics",
//         genre: "superhero",
//         number_of_pages: "197",
//         starRating: 3,
//         synopsis: "This masterpiece of modern comics storytelling brings to vivid life a dark world and an even darker man. Together with inker Klaus Janson and colorist Lynn Varley, writer/artist Frank Miller completely reinvents the legend of Batman in his saga of a near-future Gotham City gone to rot, ten years after the Dark Knight's retirement. Crime runs rampant in the streets, and the man who was Batman is still tortured by the memories of his parents' murders. As civil society crumbles around him, Bruce Wayne's long-suppressed vigilante side finally breaks free of its self-imposed shackles. The Dark Knight returns in a blaze of fury, taking on a whole new generation of criminals and matching their level of violence. He is soon joined by this generation's Robin—a girl named Carrie Kelley, who proves to be just as invaluable as her predecessors. But can Batman and Robin deal with the threat posed by their deadliest enemies, after years of incarceration have made them into perfect psychopaths? And more important, can anyone survive the coming fallout of an undeclared war between the superpowers—or a clash of what were once the world's greatest superheroes? Over fifteen years after its debut, Batman: The Dark Knight Returns remains an undisputed classic and one of the most influential stories ever told in the comics medium."
//     },
//     {
//         _id: '011',
//         title: "Queer: A Graphic History",
//         image: "queer.jpg",
//         author: "Meg-John Barker",
//         publisher: "Icon Books",
//         genre: "nonfiction",
//         number_of_pages: "176",
//         starRating: 4,
//         synopsis: "Activist-academic Meg-John Barker and cartoonist Julia Scheele illuminate the histories of queer thought and LGBTQ+ action in this groundbreaking non-fiction graphic novel. From identity politics and gender roles to privilege and exclusion, Queer explores how we came to view sex, gender and sexuality in the ways that we do; how these ideas get tangled up with our culture and our understanding of biology, psychology and sexology; and how these views have been disputed and challenged.Along the way we look at key landmarks which shift our perspective of what’s ‘normal’ – Alfred Kinsey’s view of sexuality as a spectrum, Judith Butler’s view of gendered behaviour as a performance, the play Wicked, or moments in Casino Royale when we’re invited to view James Bond with the kind of desiring gaze usually directed at female bodies in mainstream media. Presented in a brilliantly engaging and witty style, this is a unique portrait of the universe of queer thinking."
//     },
//     {
//         _id: '012',
//         title: "Parable of the Sower",
//         image: "parable-of-the-sower.jpg",
//         author: "Octavia E. Butler",
//         publisher: "Harry N. Abrams",
//         genre: "dystopian",
//         number_of_pages: "284",
//         starRating: 4,
//         synopsis: "In this graphic novel adaptation of Octavia E. Butler’s Parable of the Sower by Damian Duffy and John Jennings, the award-winning team behind Kindred: A Graphic Novel Adaptation, the author portrays a searing vision of America’s future. In the year 2024, the country is marred by unattended environmental and economic crises that lead to social chaos. Lauren Olamina, a preacher’s daughter living in Los Angeles, is protected from danger by the walls of her gated community. However, in a night of fire and death, what begins as a fight for survival soon leads to something much more: a startling vision of human destiny . . . and the birth of a new faith."
//     }
//   ]


// 2. Set statement for ejs
app.set('view engine', 'ejs')

// 3. Use statements for public folder and morgan
app.use(express.static(path.join(__dirname, 'public')))

// app.use(morgan('combined'))

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(methodOverride('_method'))

app.use(morgan('dev'));

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(routes);

// 4. Routes setup
// app.get('/', (request,response) => {
//     response.render('pages/index',{
//         inventoryArray: comicInventory,
//     })
//     response.send("This route points to the Home page")
// })

// app.get('/about', (request,response) => {
//     response.render('pages/about',{
//         inventoryArray: comicInventory,
//         totalPub: totalPub
//     })
//     response.send("This route points to the About page")
// })

// app.get('/login', (request,response) => {
//     response.render('pages/login')
//     response.send("This route points to the Login page")
// })

// app.get('/admin-console', (request,response) => {
//     response.render('pages/admin')
//     response.send("This route points to the Admin Console page")
// })

// app.get('/admin-console/create-book', (request,response) => {
//     response.render('pages/create')
//     response.send("This route points to the Create page")
// })

// app.get('/books/:_id', (request, response) => {
//     let params = request.params;
//     console.log(params);
//     if (params._id === '001') {
//         response.render('pages/book', {
//           comic: comicInventory[0]
//       });
//     } else if (params._id === '002') {
//         response.render('pages/book', {
//           comic: comicInventory[1]
//       });
//     } else if (params._id === '003') {
//         response.render('pages/book', {
//           comic: comicInventory[2]
//       });
//     } else if (params._id === '004') {
//         response.render('pages/book', {
//           comic: comicInventory[3]
//       });
//     } else if (params._id === '005') {
//         response.render('pages/book', {
//           comic: comicInventory[4]
//       });
//     } else if (params._id === '006') {
//         response.render('pages/book', {
//           comic: comicInventory[5]
//       });
//     } else if (params._id === '007') {
//         response.render('pages/book', {
//           comic: comicInventory[6]
//       });
//     } else if (params._id === '008') {
//         response.render('pages/book', {
//           comic: comicInventory[7]
//       });
//     } else if (params._id === '009') {
//         response.render('pages/book', {
//           comic: comicInventory[8]
//       });
//     } else if (params._id === '010') {
//         response.render('pages/book', {
//           comic: comicInventory[9]
//       });
//     } else if (params._id === '011') {
//         response.render('pages/book', {
//           comic: comicInventory[10]
//       });
//     } else if (params._id === '012') {
//         response.render('pages/book', {
//           comic: comicInventory[11]
//       });
//     } else {
//         response.send(`This comic doesn't exist. Try searching again. `);        
//     };
//   });

// app.get('/admin-console/update-book/:id',(request,response) => {
//     let params = request.params;
//     if(params._id === '001') {
//         response.render('pages/update')
//     }
// })

// app.get('/:nameParam', (request, response) => {
//   let parameters = request.params;
//   let name = parameters.nameParam;
//   response.send(`It worked ${name}. Imagine how this route could lead to the profile of ${name}, which is what was typed into the URL in place of :nameParam. Routes with parameters are awesome.`)
// })

// 4. config connection
require('./config/connection')

// 5. Server setup
app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`)
})