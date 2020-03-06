// using express for routing
const express = require( 'express' );

// load data files
const postNavigation = require( './data/post-navigation.json' );

// set port
const port = process.env.PORT || 1123;

// create express app
const app = express();

// use Pug for templates
app.set( 'view engine', 'pug' );

// prepare base data to pass to all templates.
const baseData = {
	year: ( new Date() ).getFullYear(),
	postNavigation: postNavigation.items,
};

// serve static files
app.use( express.static( 'public' ) );

// homepage
app.get( '/', ( req, res ) => {
	res.render( 'index', { ...baseData } );
} );

// top entry page
app.get( '/entry', ( req, res ) => {
	res.render( 'index', { ...baseData } );
} );

// entries
app.get( '/entry/:slug', ( req, res, next ) => {
	const { slug } = req.params;
	res.render( `entries/${slug}`, { ...baseData }, ( err, html ) => {
		if ( err ) next();

		res.send( html );
	} );
} );

// landing pages
app.get( '/:slug', ( req, res, next ) => {
	const { slug } = req.params;
	res.render( `landing-pages/${slug}`, { ...baseData }, ( err, html ) => {
		if ( err ) next();

		res.send( html );
	} );
} );

// handle 404s
app.use( ( req, res, next ) => {
	res.status( 404 );
	res.render( '404', { ...baseData } );
} );

// start up the server
app.listen( port, () => console.log( `Wiki running http://localhost:${port}` ) );
