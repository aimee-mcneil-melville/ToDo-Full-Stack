exports.seed = function (knex, Promise) {
  return knex('media_list').insert([
    { id: 1, user_id: 10001, genre: 'Indie Rock', media_name: 'Hengelo', artist: 'Spring Offensive', link: 'https://open.spotify.com/track/4rqpg85XNApASjAvqjHlb1?si=2bdc00343f3e47f2', comment: 'Spring Offensive are my go to band when I need a dose of working class dread' },
    { id: 2, user_id: 10001, genre: 'Indie Rock', media_name: 'By Design', artist: 'Tigercub', link: 'https://open.spotify.com/track/6ICdz2wvVMDC4u801OwHA2?si=8e214d39012c4685', comment: 'Cynical political song. Cool drums.' },
    { id: 3, user_id: 10001, genre: 'Indie Rock', media_name: 'High Strings', artist: 'Noise Punk', link: 'https://open.spotify.com/track/38HaKBYwrqnhrjf9sqJbfc?si=e9bc96d2247c4347', comment: 'Auckland noise 3 piece.' },
    { id: 4, user_id: 10001, genre: 'Funky House', media_name: 'I look to you (feat. Kimbra)', artist: 'Miami Horror', link: 'https://open.spotify.com/track/0L0GeZL4lyx34nYDzsNuG4?si=a89fdafe24d74899', comment: 'Funky house banger from the olden days featuring Kimbra from right here in NZ' },
    { id: 5, user_id: 10001, genre: 'Emo', media_name: 'I WIll Be Okay Everything', artist: 'The World Is A Beautiful Place & I Am No Longer Afraid To Die', link: 'https://open.spotify.com/track/6OGIl9BPa2H6UVyC0FxHM5?si=c07d49a7c1e54371', comment: 'Midwest Emo revival kids. This is from their golden age, with their original singer' },
    { id: 6, user_id: 10001, genre: 'Mathcore', media_name: "You Know That Aint Them Dogs' Real Voices", artist: 'iwrestledabearonce', link: 'https://open.spotify.com/track/0NWxL0fO7j8pUSgKncipY6?si=8ed18a0ed3894793', comment: 'One of the earliest metal bands with female growling vocals' },
    { id: 7, user_id: 10002, genre: 'Stoner Rock', media_name: 'Rule The Beast', artist: 'Torche', link: 'https://open.spotify.com/track/0RzryWDVHhsziHkXsT2HqV?si=b42fc552b8ff497d', comment: 'The bass breakdown at 1m20s will melt your ears off' },
    { id: 8, user_id: 10002, genre: 'Synthwave', media_name: 'From Liquid', artist: 'Mt Kitty', link: 'https://open.spotify.com/track/4jQdD7SuEB9evpBL3brmbC?si=276ce37528b94b81', comment: 'Blends sythwave with some trap elements' }

  ])
}
