const airlinefees = [
  {
    link: 'https://www.adria.si/en/information/baggage/',
    airline: 'Adria'
  },
  {
    link: 'https://en.aegeanair.com/travel-information/baggage/add-baggage/',
    airline: 'Aegean Airlines'
  },
  {
    link: 'http://www.aerlingus.com/help/help/baggageinformation/',
    airline: 'Aer Lingus'
  },
  {
    link: 'http://www.flyaero.com/conditions-of-carriage.aspx#article8',
    airline: 'Aero'
  },
  {
    link: 'http://www.aeroflot.ru/cms/en/before_and_after_fly/luggage',
    airline: 'Aeroflot'
  },
  {
    link:
      'http://www.aerolineas.com.ar/arg/main.asp?idSitio=EU&idPagina=50&idIdioma=en',
    airline: 'Aerolineas Argentinas'
  },
  {
    link: 'http://www.aeromar.com.mx/faq/equipaje/',
    airline: 'Aeromar'
  },
  {
    link: 'https://aeromexico.com/en-gb/travel-information/baggage',
    airline: 'Aeromexico'
  },
  {
    link:
      'https://world.aeromexico.com/en/travel-with-aeromexico/baggage/?site=us',
    airline: 'AeroMexico Connect'
  },
  {
    link: 'http://www.afriqiyahairlines.org.uk/baggage-information.html',
    airline: 'Afriqiyah Airways'
  },
  {
    link: 'http://www.aigle-azur.com/luggage/checked/',
    airline: 'Aigle Azur'
  },
  {
    link:
      'http://www.airalgerie.dz/docs/General%20conditions%20of%20carriage.pdf',
    airline: 'Air Algerie'
  },
  {
    link:
      'https://airastana.com/global/Information/Baggage-Information/Baggage-Allowance',
    airline: 'Air Astana'
  },
  {
    link:
      'http://www.air-austral.com/en/prepare-your-flight/your-baggage/checked-baggage.html',
    airline: 'Air Austral'
  },
  {
    link:
      'http://www.airberlin.com/en-GB/site/flug_gepaeck_luggage.php?et_cid=14015&et_lid=6760031',
    airline: 'Air Berlin'
  },
  {
    link:
      'https://www.airbotswana.co.bw/sites/default/files/AIR%20BOTSWANA%20(BP636)%20BAGGAGE%20POLICY.pdf',
    airline: 'Air Botswana'
  },
  {
    link: 'http://www.air-burkina.com/en/preparer-son-voyage/bagages/',
    airline: 'Air Burkina'
  },
  {
    link: 'http://eu.aircalin.com/en/prepare-trip/baggage/checked-baggage',
    airline: 'Air Calédonie'
  },
  {
    link: 'http://www.aircanada.com/en/travelinfo/airport/baggage/index.html',
    airline: 'Air Canada'
  },
  {
    link: 'http://www.aircanada.com/en/travelinfo/airport/baggage/index.html',
    airline: 'Air Canada Jazz'
  },
  {
    link:
      'http://www.aircaraibes.com/rubrique/resume/1940899575992681135/Bagages.html',
    airline: 'Air Caraibes'
  },
  {
    link: 'http://www.airchina.com.cn/cn/baggage_service/checked_in.shtml',
    airline: 'Air China'
  },
  {
    link: 'http://www.aircorsica.com/bagages-enregistres/',
    airline: 'Air Corsica'
  },
  {
    link:
      'http://www.airdolomiti.eu/travel-information-and-services/before-flying/',
    airline: 'Air Dolomiti'
  },
  {
    link:
      'http://www.aireuropa.com/waeam/en/estaticos/guia_pasajero/equipaje.html',
    airline: 'Air Europa'
  },
  {
    link: 'http://www.airexplore.sk/passengers',
    airline: 'Air Explore'
  },
  {
    link:
      'http://www.airfrance.us/US/en/common/guidevoyageur/pratique/bagage_franchise_airfrance.htm',
    airline: 'Air France'
  },
  {
    link: 'http://www.airgreenland.com/help/before-travel/baggage',
    airline: 'Air Greenland'
  },
  {
    link: 'http://www.airindia.com/baggage.htm',
    airline: 'Air India'
  },
  {
    link:
      'https://www.alitalia.com/en_us/fly-alitalia/baggage/checked-baggage.html',
    airline: 'Air Italy'
  },
  {
    link:
      'http://caribbean-airlines.com/index.php/plan-a-book/baggage-information',
    airline: 'Air Jamaica'
  },
  {
    link: 'https://www.airmacau.com.mo/eng/service/rules.php',
    airline: 'Air Macau'
  },
  {
    link: 'http://www.airmalta.com/baggage',
    airline: 'Air Malta'
  },
  {
    link: 'http://www.airmauritius.com/baggage.htm',
    airline: 'Air Mauritius'
  },
  {
    link: 'http://www.airmoldova.md/luggage-en/',
    airline: 'Air Moldova'
  },
  {
    link: 'http://www.airline-baggage-fees.com/air-nelson.php',
    airline: 'Air Nelson'
  },
  {
    link: 'http://www.airnewzealand.com/optional-fees#checkedbaggage',
    airline: 'Air New Zealand'
  },
  {
    link: 'http://airniugini.com.pg/plan-book/baggage/',
    airline: 'Air Niugini'
  },
  {
    link: 'http://www.iberia.com/gb/luggage/hand-luggage/',
    airline: 'Air Nostrum'
  },
  {
    link: 'http://info.airprishtina.com/content/index.php?id=46&L=1',
    airline: 'Air Prishtina'
  },
  {
    link: 'http://airsaintpierre.com/en/travel-information/baggage/',
    airline: 'Air Saint-Pierre'
  },
  {
    link: 'https://www.airserbia.com/en/baggage',
    airline: 'Air Serbia'
  },
  {
    link: 'https://www.airseychelles.com/en/before-you-fly/baggage-information',
    airline: 'Air Seychelles'
  },
  {
    link: 'https://www.airtahiti.com/baggage',
    airline: 'Air Tahiti'
  },
  {
    link: 'http://www.airtahitinui-usa.com/traveldesk/baggage.asp',
    airline: 'Air Tahiti Nui'
  },
  {
    link: 'http://www.air-timor.com/travel-planning/baggage/',
    airline: 'Air Timor'
  },
  {
    link: 'https://www.airtransat.com/en-CA/baggage-and-optional-services-fees',
    airline: 'Air Transat'
  },
  {
    link: 'https://www.airvanuatu.com/home/plan-book/baggage/',
    airline: 'Air Vanuatu'
  },
  {
    link: 'http://www.airasia.com/ot/en/baggage-info/checked-baggage.page?',
    airline: 'AirAsia'
  },
  {
    link: 'https://www.airbaltic.com/en/baggage',
    airline: 'airBaltic'
  },
  {
    link: 'http://au.aircalin.com/bagage-avion.php',
    airline: 'Aircalin'
  },
  {
    link: 'https://www.airchoiceone.com/customer-service/baggage-policies/',
    airline: 'AirChoiceOne'
  },
  {
    link: 'http://www.apng.com/en/bookings/terms-and-conditions/',
    airline: 'Airlines PNG'
  },
  {
    link: 'https://flyairlink.com/information/baggage-policy#/checked',
    airline: 'Airlink'
  },
  {
    link: 'http://www.airtran.com/policies/carry-on_checked.aspx',
    airline: 'airTran'
  },
  {
    link:
      'http://www.akbarsaero.ru/en/main/flight_info/rules/transportation_of_baggage/',
    airline: 'Ak Bars Aero'
  },
  {
    link:
      'http://www.alaskaair.com/content/travel-info/policies/baggage-checked.aspx?lid=home-page:quick-links::checked-baggage',
    airline: 'Alaska Airlines'
  },
  {
    link:
      'https://www.alitalia.com/en_us/fly-alitalia/baggage/checked-baggage.html',
    airline: 'Alitalia'
  },
  {
    link: 'https://www.allegiantair.com/baggage-1',
    airline: 'Allegiant Air'
  },
  {
    link:
      'http://www.aa.com/i18n/travelInformation/baggage/baggageAllowance.jsp',
    airline: 'American Airlines'
  },
  {
    link:
      'http://www.aa.com/i18n/travelInformation/baggage/baggageAllowance.jsp',
    airline: 'American Eagle'
  },
  {
    link: 'http://www.ana.co.jp/wws/uk/e/asw_common/prepare/baggage/index.html',
    airline: 'ANA'
  },
  {
    link: 'http://www.angara.aero/handbook/regulations/#',
    airline: 'Angara Air lines'
  },
  {
    link: 'http://www.tui.nl/vliegtickets/ustravelers/',
    airline: 'TUI Netherlands'
  },
  {
    link: 'http://www.arkia.com/click/static_page?pageid=info_baggage',
    airline: 'arkia'
  },
  {
    link: 'http://www.asercaairlines.com/EN-US/Serv02.aspx',
    airline: 'Aserca Airlines'
  },
  {
    link: 'http://www.astra-airlines.gr/pages.php?cat=6&s=1',
    airline: 'Astra Airlines'
  },
  {
    link: 'https://www.atlantic.fo/en/travel-info/before-flying/baggage-rules/',
    airline: 'Atlantic Airways'
  },
  {
    link: 'http://cmss.atlasjet.com/en/faq#Baggage',
    airline: 'AtlasJet'
  },
  {
    link: 'https://www.aurigny.com/html/en/fLuggage.aspx?lang=EN',
    airline: 'Aurigny'
  },
  {
    link:
      'http://www.austral.com.ar/arg/main.asp?idSitio=AR&idPagina=50&idIdioma=en',
    airline: 'Austral'
  },
  {
    link: 'http://www.austrian.com/Info/FlightPreparation/Baggage.aspx',
    airline: 'Austrian Airlines'
  },
  {
    link:
      'https://www.avianca.com.br/en/web/home/bagagens#bagagem-geral_-_bagagem-geral',
    airline: 'Avianca Brasil'
  },
  {
    link: 'http://www.flyavies.ee/en/reisiinfo/pagasireeglid-ja-eripagas/',
    airline: 'Avies'
  },
  {
    link: 'https://www.azal.az/en/information/baggage',
    airline: 'AZAL'
  },
  {
    link:
      'http://www.voeazul.com.br/en/for-your-trip/international-flights/your-baggage',
    airline: 'Azul Linhas Aéreas'
  },
  {
    link: 'http://www.bhairlines.com/page.php?id=38',
    airline: 'B&amp;H Airlines'
  },
  {
    link:
      'http://www.britishairways.com/en-gb/information/baggage-essentials?source=MNVINF3baggage_essentials&link=main_nav',
    airline: 'BA Cityflyer'
  },
  {
    link:
      'http://www.badrairlines.com/index.php?option=com_k2&view=item&layout=item&id=6&Itemid=20',
    airline: 'Badr Airlines'
  },
  {
    link: 'http://www.bangkokair.com/pages/conditions/condition-baggage',
    airline: 'Bangkok Airways'
  },
  {
    link: 'http://www.bearskinairlines.com/baggage-policy',
    airline: 'Bearskin Airlines'
  },
  {
    link: 'http://en.belavia.by/passengers/baggage/',
    airline: 'Belavia'
  },
  {
    link: 'http://www.bergenair.co.uk/about-bergen-air/practical-information/',
    airline: 'Bergen Air Transport'
  },
  {
    link: 'https://www.berjaya-air.com/general-conditions-of-carriage',
    airline: 'Berjaya Air'
  },
  {
    link: 'http://www.bintercanarias.com/infServMgr.php?opciones=3_5&submenu=2',
    airline: 'Binter Canarias'
  },
  {
    link: 'http://www.blueairweb.com/Carriage-Conditions/#ch9',
    airline: 'Blue Air'
  },
  {
    link: 'http://www.blue-panorama.com/en/luggage.html',
    airline: 'Blue Panorama'
  },
  {
    link: 'http://www.blu-express.com/en/faq.html#faq14',
    airline: 'Blu-express'
  },
  {
    link: 'http://www.borajet.com.tr/en/faq',
    airline: 'Borajet'
  },
  {
    link:
      'http://www.britishairways.com/en-gb/information/baggage-essentials?source=MNVINF3baggage_essentials&link=main_nav',
    airline: 'British Airways'
  },
  {
    link:
      'https://www.brusselsairlines.com/en-de/practical-information/travel-info/before-the-flight/luggage-info/allowances-fees/default.aspx',
    airline: 'Brussels Airlines'
  },
  {
    link: 'https://www.buddhaair.com/content/fare-rules-and-regulations.html',
    airline: 'Buddha Air'
  },
  {
    link: 'https://www.air.bg/en/customer-support/your-baggage',
    airline: 'Bulgaria Air'
  },
  {
    link: 'http://www.bgaircharter.com/index.php?page=25',
    airline: 'Bulgarian Air Charter'
  },
  {
    link: 'http://www.calmair.com/checked_baggage.html',
    airline: 'Calm Air'
  },
  {
    link: 'http://www.canadiannorth.com/info/checked-luggage',
    airline: 'Canadian North'
  },
  {
    link: 'https://www.capeair.com/flying_with_us/baggage_info.html',
    airline: 'Cape Air'
  },
  {
    link:
      'http://caribbean-airlines.com/index.php/plan-a-book/baggage-information',
    airline: 'Caribbean Airlines'
  },
  {
    link:
      'http://www.cathaypacific.com/cx/en_GB/travel-information/baggage.html',
    airline: 'Cathay Pacific'
  },
  {
    link: 'https://www.caymanairways.com/baggage-policy',
    airline: 'Cayman Airways'
  },
  {
    link: 'http://www.flycma.com/terms-conditions',
    airline: 'Central Mountain Air'
  },
  {
    link:
      'https://www.china-airlines.com/us/en/fly/prepare-for-the-fly/baggage/baggage-rules',
    airline: 'China Airlines'
  },
  {
    link: 'http://hk.ceair.com/muovc/main/en_HK/Static_pages/Baggage.html',
    airline: 'China Eastern'
  },
  {
    link: 'http://www.csair.com/en/orders/order/kpxlgd/',
    airline: 'China Southern'
  },
  {
    link: 'https://www.cityjet.com/flying-with-us/travel-information/baggage/',
    airline: 'CityJet'
  },
  {
    link: 'http://www.flycommutair.com/',
    airline: 'CommutAir'
  },
  {
    link:
      'http://www.condor.com/us/flight-info/baggage/hand-baggage-free-baggage.jsp',
    airline: 'Condor'
  },
  {
    link: 'http://portal.conviasa.aero/en/guiapasajero/equipajemano',
    airline: 'Conviasa'
  },
  {
    link:
      'http://www.copaair.com/sites/cc/en/informacion-de-viaje/pages/Condiciones-Generales-de-Equipaje.aspx',
    airline: 'Copa'
  },
  {
    link: 'http://www.corendon.com/en-EN/a/Frequently-asked-questions#15',
    airline: 'Corendon'
  },
  {
    link: 'http://www.corendonairlines.nl/vervoersvoorwaarden/#artikel8',
    airline: 'Corendon Dutch Airlines'
  },
  {
    link:
      'https://www.corsair.ca/flight/services/corsairs-services/Luggages/hold-luggage',
    airline: 'Corsair'
  },
  {
    link: 'http://www.croatiaairlines.com/Travel-info/Baggage/Checked-baggage',
    airline: 'Croatia Airlines'
  },
  {
    link: 'https://www.cyprusairways.com/info/baggage.dot',
    airline: 'Cyprus Airways'
  },
  {
    link:
      'http://www.csa.cz/en/portal/info-and-services/travel-information/baggage2.htm',
    airline: 'Czech Airlines'
  },
  {
    link: 'https://dat.worldticket.net/en/baggage/',
    airline: 'Danish Air Transport'
  },
  {
    link: 'https://www.etihadregional.com/en-us/before-you-fly/baggage/',
    airline: 'Darwin Airline'
  },
  {
    link: 'http://www.delta.com/traveling_checkin/baggage/checked/index.jsp',
    airline: 'Delta'
  },
  {
    link: 'http://www.aeroflot-don.ru/services.aspx?no=606&language=en',
    airline: 'Donavia'
  },
  {
    link: 'http://www.dragonair.com/da/en_IN/helpingyoutravel/baggageallowance',
    airline: 'Dragonair'
  },
  {
    link: 'http://www.airnewzealand.co.nz/baggage',
    airline: 'Eagle Airways'
  },
  {
    link: 'http://www.easternairways.com/luggage',
    airline: 'Eastern Airways'
  },
  {
    link: 'http://www.qantas.com.au/travel/airlines/baggage/global/en',
    airline: 'Eastern Australia Airlines'
  },
  {
    link: 'http://www.easyjet.com/en/planning/baggage.html',
    airline: 'easyJet'
  },
  {
    link: 'http://www.edelweissair.ch/en/services/luggage/',
    airline: 'edelweiss air'
  },
  {
    link:
      'http://www.egyptair.com/en/Book/Pages/book-flight.aspx?gclid=Cj0KEQiAw_DEBRChnYiQ_562gsEBEiQA4LcssjoxwtLBVv-6hJhsNcMRjju1fUZ9NSTeRRTnS_C1rUQaAn_J8P8HAQ',
    airline: 'EgyptAir'
  },
  {
    link:
      'http://www.elal.co.il/ELAL/English/AllAboutYourFlight/BeforeYourFlight/LuggageAndBaggage/En_BaggagePolicy_150212.html',
    airline: 'EL AL Israel Airlines'
  },
  {
    link:
      'http://www.emirates.com/au/english/plan_book/essential_information/baggages/baggages.aspx',
    airline: 'Emirates'
  },
  {
    link: 'https://www.flyravn.com/flying-with-ravn/baggage-information/',
    airline: 'Era Aviation'
  },
  {
    link:
      'https://www.ethiopianairlines.com/information/baggage/free-baggage-allowance',
    airline: 'Ethiopian Airlines'
  },
  {
    link: 'http://www.etihad.com/en-gb/before-you-fly/baggage-information/',
    airline: 'Etihad Airways'
  },
  {
    link: 'http://www.euroatlantic.com/html/en_quem_material_perigoso.asp',
    airline: 'Euroatlantic Airways Charter'
  },
  {
    link:
      'http://www.evaair.com/en-global/check-in-baggage-and-airports/baggage-information/allowances/',
    airline: 'EVA Air'
  },
  {
    link: 'http://xpressair.co.id/moreInfo_faq3.php',
    airline: 'Express Air'
  },
  {
    link: 'http://www.fijiairways.com/flight-information/baggage-allowances/',
    airline: 'Fiji Airways'
  },
  {
    link: 'https://www.finnair.com/INT/GB/information-services/baggage',
    airline: 'Finnair'
  },
  {
    link: 'http://www.firstair.ca/flying/baggage/',
    airline: 'First Air'
  },
  {
    link: 'http://www.flybrazil.co.uk/site/baggage-alowances',
    airline: 'Fly Brazil'
  },
  {
    link: 'http://www.flybe.com/baggage/hand-baggage.htm',
    airline: 'Flybe'
  },
  {
    link: 'http://www.flydubai.com/en/travel/baggage-policy/',
    airline: 'Flydubai'
  },
  {
    link:
      'http://www.flyniki.com/en-GB/site/flug_gepaeck_luggage.php?name=baggage',
    airline: 'FlyNiki'
  },
  {
    link: 'https://www.olympicair.com/en',
    airline: 'FlyOlympic'
  },
  {
    link: 'https://www.thomascook.com/baggage/additional-baggage/',
    airline: 'flythomascook'
  },
  {
    link: 'https://www.flyfrontier.com/travel-information/baggage/',
    airline: 'Frontier Airlines'
  },
  {
    link: 'http://www.garuda-indonesia.com/uk/en/contact/faq.page?#Baggage',
    airline: 'Garuda Indonesia'
  },
  {
    link: 'http://www.georgian-airways.com/?l=E&m=4&sm=12',
    airline: 'Georgian Airways'
  },
  {
    link: 'http://www.germanwings.com/en/Service/Luggage.htm',
    airline: 'germanwings'
  },
  {
    link:
      'http://www.s7.ru/home/info/faq/faq.dot?cat=booking&subCat=additional_baggage',
    airline: 'Globus Airlines'
  },
  {
    link:
      'http://www.voegol.com.br/en-us/viaje-sem-duvidas/fazendo-as-malas/tipos-de-bagagens/paginas/default.aspx',
    airline: 'GOL Linhas Aéreas'
  },
  {
    link: 'http://www.goldenbayair.co.nz/terms.html',
    airline: 'Golden Bay Air'
  },
  {
    link: 'http://www.gotlandsflyg.se/sv/reseinformation/bagage/',
    airline: 'Gotlandsflyg'
  },
  {
    link: 'http://www.barrierair.kiwi/Flying-with-us/passenger-information/',
    airline: 'Great Barrier Airlines'
  },
  {
    link:
      'http://www.greatlakesav.com/contract_of_carriage/doc_files/bags_for_website.pdf',
    airline: 'Great Lakes Airlines'
  },
  {
    link:
      'http://www.gulfair.com/English/info/Baggage/Pages/Baggage_Allowances.aspx',
    airline: 'Gulf Air'
  },
  {
    link: 'http://www.hawaiianair.com/help/fees-id-1922',
    airline: 'Hawaiian Airlines'
  },
  {
    link: 'http://www.hellenicairways.com/baggage#faws36',
    airline: 'Hellenic Imperial Airways'
  },
  {
    link: 'http://www.info.hac-air.co.jp/checkin/carrybag.html',
    airline: 'Hokkaido Air System'
  },
  {
    link:
      'http://www.hongkongairlines.com/en_HK/services/baggage/checkedbaggage',
    airline: 'Hong Kong Airlines'
  },
  {
    link: 'https://www.hkexpress.com/en-hk/plan/our-fares/our-fees',
    airline: 'Hongkong Express'
  },
  {
    link: 'http://www.hop.fr/en/info/baggage',
    airline: 'Hop!'
  },
  {
    link: 'http://flyibcair.com/travel-policies/baggage-policy/',
    airline: 'IBC Airways'
  },
  {
    link: 'http://www.iberia.com/luggage/allowance-in-hold/',
    airline: 'Iberia'
  },
  {
    link: 'http://www.iberiaexpress.com/en/baggage/allowance-in-hold/',
    airline: 'Iberia Express'
  },
  {
    link:
      'http://www.icelandair.co.uk/information/baggage-information/carry-on-baggage/',
    airline: 'Icelandair'
  },
  {
    link:
      'http://www.iflyltd.ru/index.php?option=com_content&view=article&id=9&Itemid=16',
    airline: 'I-Fly'
  },
  {
    link: 'http://www.igavion.fr/en/bagages/',
    airline: 'IGavion'
  },
  {
    link:
      'https://www.goindigo.in/information/travel-information/baggage/bag-allowance.html',
    airline: 'IndiGo'
  },
  {
    link: 'http://www.fly-inselair.com/traveler-info/baggage-information',
    airline: 'Insel Air'
  },
  {
    link:
      'http://www.iranair.com/Portal/Home/Default.aspx?CategoryID=35564c00-509a-4442-aad9-2ebd5be13b1b',
    airline: 'IranAir'
  },
  {
    link: 'http://www.iraqiairways.co.uk/en/baggage_allowance.html',
    airline: 'Iraqi Airways'
  },
  {
    link: 'http://www.islandair.com/flight-info/baggage/',
    airline: 'Island Air'
  },
  {
    link: 'http://www.jal.co.jp/en/carriage/index_c009.html',
    airline: 'JAL Express'
  },
  {
    link: 'http://www.jal.co.jp/en/inter/service/bag/',
    airline: 'Japan Airlines'
  },
  {
    link: 'http://www.jal.co.jp/en/dom/yakkan/jta.html',
    airline: 'Japan Transocean Air'
  },
  {
    link:
      'https://https.jetairways.com/EN/US/TravelInformation/Baggage/baggage-allowances.aspx',
    airline: 'Jet Airways'
  },
  {
    link: 'http://www.jet2.com/new/answers/baggage',
    airline: 'Jet2'
  },
  {
    link: 'http://www.jetairfly.com/en/Questions',
    airline: 'JetairFly'
  },
  {
    link: 'http://www.jetblue.com/travel/baggage/',
    airline: 'jetBlue'
  },
  {
    link: 'http://www.jetkonnect.com/in/baggage_allowance.aspx',
    airline: 'JetKonnect'
  },
  {
    link:
      'http://www.jetstar.com/au/en/planning-and-booking/baggage/checked-baggage',
    airline: 'Jetstar'
  },
  {
    link: 'http://www.jetxtra.uk.com/faq.html',
    airline: 'JetXtra.com'
  },
  {
    link: 'https://www.kenmoreair.com/Before-you-fly/faq-s/',
    airline: 'Kenmore Air'
  },
  {
    link:
      'https://www.kenya-airways.com/prepare-for-travel/baggage-information/excess-baggage-charges/en/',
    airline: 'Kenya Airways'
  },
  {
    link:
      'http://www.klm.com/travel/us_en/prepare_for_travel/baggage/baggage_allowance/index.htm',
    airline: 'KLM'
  },
  {
    link: 'http://www.koreanair.com/local/na/gd/eng/aa/bt/eng_bg_0101.jsp',
    airline: 'Korean Air'
  },
  {
    link: 'https://www.ak-krasavia.ru/',
    airline: 'KrasAvia'
  },
  {
    link: 'https://www.kuwaitairways.com/en/olci-info',
    airline: 'Kuwait Airways'
  },
  {
    link:
      'http://www.lam.co.mz/en/Travel-Information/Baggage-Information/Checked-Baggage',
    airline: 'LAM'
  },
  {
    link:
      'https://www.latam.com/en_us/travel-information/baggage/checked-baggage/',
    airline: 'LATAM Airlines'
  },
  {
    link:
      'http://www.lan.com/en_uk/sitio_personas/plan-and-book/baggage-info/index.html',
    airline: 'LAN Colombia'
  },
  {
    link:
      'http://www.lan.com/en_uk/sitio_personas/plan-and-book/baggage-info/index.html',
    airline: 'LanExpress'
  },
  {
    link: 'http://www.laoairlines.com/?contentkey=pages&id=22',
    airline: 'Lao Airlines'
  },
  {
    link: 'https://www.laser.com.ve/Site/',
    airline: 'LASER Airlines'
  },
  {
    link: 'https://www.liat.com/navSource.html?page_id=3',
    airline: 'LIAT'
  },
  {
    link: 'http://www.lot.com/pl/en/baggage',
    airline: 'LOT'
  },
  {
    link: 'http://www.lufthansa.com/us/en/Free-baggage-rules',
    airline: 'Lufthansa'
  },
  {
    link: 'http://www.lufthansa.com/uk/en/Baggage-overview',
    airline: 'Lufthansa CityLine'
  },
  {
    link: 'http://www.luxair.co.uk/cms/page?p=EN,59045,1324,,1,,',
    airline: 'Luxair'
  },
  {
    link:
      'https://www.malaysiaairlines.com/my/en/plan/baggage/checked-baggage.html',
    airline: 'Malaysia Airlines'
  },
  {
    link: 'http://www.malmoaviation.se/en/travelinfo',
    airline: 'Malmo Aviation'
  },
  {
    link: 'http://www.mandarin-airlines.com/english/airport_baggage.htm',
    airline: 'Mandarin Airlines'
  },
  {
    link: 'https://www.mea.com.lb/english/Baggage/Baggage-Information',
    airline: 'MEA'
  },
  {
    link: 'https://www.meridiana.it/us/optionalfees/all_optional_fees.html',
    airline: 'Meridiana'
  },
  {
    link: 'http://www.miat.com/pagecontent.php?pageId=49&lang=en',
    airline: 'MIAT Mongolian Airlines'
  },
  {
    link: 'http://www.minoanair.com/',
    airline: 'Minoan Air'
  },
  {
    link: 'https://www.mokuleleairlines.com/travel-info/policies/',
    airline: 'Mokulele Airlines'
  },
  {
    link: 'https://www.airmoldova.md/luggage-en/',
    airline: 'Moldavian Airlines'
  },
  {
    link: 'http://www.mombasaairsafari.com/Book-an-Air-Safari/FAQ',
    airline: 'Mombasa Air Safari'
  },
  {
    link:
      'http://www.monarch.co.uk/faq/flights/baggage/hold-checked-in-baggage-charges-charter',
    airline: 'Monarch'
  },
  {
    link:
      'http://www.montenegroairlines.com/active/en/home/gornja_navigacija/informacije_i_servis/prtljag.html',
    airline: 'Montenegro Airlines'
  },
  {
    link: 'http://maiair.com/',
    airline: 'Myanmar Airways International'
  },
  {
    link: 'https://www.thomascook.com/baggage/check-in-baggage/',
    airline: 'MyTravel'
  },
  {
    link: 'http://www.flynas.com/en/plan-my-trip/baggage',
    airline: 'nas air'
  },
  {
    link: 'http://www.neosair.it/en/before_the_flight/baggages/hold_baggage',
    airline: 'Neos Air'
  },
  {
    link: 'http://www.nesmaairlines.com/page/Baggage',
    airline: 'Nesma Airlines'
  },
  {
    link: 'http://www.nordavia.ru/en/passenger/baggage/',
    airline: 'Nordavia'
  },
  {
    link: 'http://www.norwegian.com/en/travel-info/baggage/checked-baggage/',
    airline: 'Norwegian'
  },
  {
    link:
      'http://www.novaturas.lt/uploads/SPA%20LT%20markt%20%20Excess%20weight%20special%20baggage%20info_EN.pdf',
    airline: 'Novaturas'
  },
  {
    link: 'https://www.olympicair.com/en/Info/Baggage/Limits',
    airline: 'Olympic Air'
  },
  {
    link: 'http://www.omanair.com/en/travel-info/baggage-services/allowance',
    airline: 'Oman Air'
  },
  {
    link:
      'http://www.flyopenskies.com/en/info-and-tips/getting-ready-for-a-trip/baggage.html',
    airline: 'OpenSkies'
  },
  {
    link: 'http://www.orenair.ru/eng/passengers/baggage/free-allowance/',
    airline: 'Oren Air'
  },
  {
    link: 'http://www.orenairport.ru/eng/passazhiram/',
    airline: 'Orenburzhye'
  },
  {
    link:
      'http://www.ana.co.jp/wws/japan/e/local/book-plan/airinfo/codeshare/domestic/detail.html?c=oc',
    airline: 'Oriental Air Bridge'
  },
  {
    link: 'http://www.pacificcoastal.com/baggage/',
    airline: 'Pacific Coastal Airlines'
  },
  {
    link: 'https://www.pascan.com/en/flights-info-pascan/',
    airline: 'Pascan Aviation'
  },
  {
    link: 'http://www.flypgs.com/en/information/general-rules.aspx',
    airline: 'Pegasus Airlines'
  },
  {
    link: 'https://www.perimeter.ca/passengers/travel-policies',
    airline: 'Perimeter'
  },
  {
    link:
      'https://www.philippineairlines.com/en/travel%20information/beforeyoufly/baggage%20information/baggageallowance/baggageallowanceandfees',
    airline: 'Philippine Airlines'
  },
  {
    link: 'http://www.piac.com.pk/PIA_Experience/pia-experience_baggagesvc.asp',
    airline: 'PIA'
  },
  {
    link: 'https://www.pineappleair.com/company/travelpolicies.php',
    airline: 'Pineapple Air'
  },
  {
    link: 'https://www.pobeda.aero/information/travel/rates_and_conditions#add',
    airline: 'Pobeda'
  },
  {
    link:
      'https://www.flyporter.com/en-ca/travel-information/baggage/carry-on-allowance',
    airline: 'Porter Airlines'
  },
  {
    link: 'https://www.precisionairtz.com/index.php?id=20',
    airline: 'Precision Air'
  },
  {
    link:
      'https://www.provincialairlines.ca/fly-right/baggage/checked-baggage/',
    airline: 'Provincial Airlines'
  },
  {
    link: 'http://www.qantas.com.au/travel/airlines/checked-baggage/global/en',
    airline: 'Qantas'
  },
  {
    link: 'http://www.qatarairways.com/global/en/baggage.page',
    airline: 'Qatar Airways'
  },
  {
    link: 'http://www.rex.com.au/flightinfo/BaggageAllowance.aspx',
    airline: 'Regional Express'
  },
  {
    link:
      'http://www.rossiya-airlines.com/en/passenger/luggage/Freebaggageallowance/',
    airline: 'Rossiya Airlines'
  },
  {
    link:
      'http://www.royalairmaroc.com/uk-en/Travel-Info/Baggage-and-service-fees',
    airline: 'Royal Air Maroc'
  },
  {
    link: 'http://www.flyroyalbrunei.com/uk/travel-info/cabin-baggage-policy/',
    airline: 'Royal Brunei'
  },
  {
    link: 'http://www.rj.com/en/bagagge_allowances_on_other_airlines.html',
    airline: 'Royal Jordanian'
  },
  {
    link: 'https://www.ryanair.com/gb/en/useful-info/help-centre/fees',
    airline: 'Ryanair'
  },
  {
    link: 'http://www.s7.ru/home/info/faq/faq.dot?cat=baggage&subCat=rules',
    airline: 'S7 Airlines'
  },
  {
    link: 'http://www.safiairways.com/baggage-allowance',
    airline: 'Safi Airways'
  },
  {
    link: 'https://www.sbairlines.com/Equipaje.aspx',
    airline: 'Santa Barbara Airlines'
  },
  {
    link: 'http://www.flysas.com/en/Travel-info/Baggage/Checked-baggage',
    airline: 'SAS'
  },
  {
    link: 'http://www.sata.pt/pt-pt/viaje-connosco/bagagem-de-cabine',
    airline: 'SATA'
  },
  {
    link: 'http://www.saudia.com/TRAVEL-INFORMATION/Baggage/Baggage-allowances',
    airline: 'Saudia'
  },
  {
    link: 'http://www.seaportair.com/policies.php',
    airline: 'SeaPort Airlines'
  },
  {
    link:
      'http://global.shenzhenair.com/zh/html/en/travelinfo/consignbaggage.html',
    airline: 'Shenzhen Airlines'
  },
  {
    link: 'http://silkair.com/mbe/en_UK/content/help/helpBaggageAllowance.jsp',
    airline: 'SilkAir'
  },
  {
    link:
      'http://www.singaporeair.com/en_UK/travel-information/baggage-allowances/',
    airline: 'Singapore Airlines'
  },
  {
    link: 'http://www.aircanada.com/en/travelinfo/airport/baggage/index.html',
    airline: 'Sky Regional'
  },
  {
    link: 'http://www.smallplanet.aero/en/travel-info/baggage.html',
    airline: 'Small Planet Airlines'
  },
  {
    link:
      'http://www.smartwings.com/en/travel-info/conditions-of-carriage/#coc_11',
    airline: 'Smart Wings'
  },
  {
    link:
      'http://www.flysolomons.com/index.php?option=com_content&view=article&id=89&Itemid=58',
    airline: 'Solomon Airlines'
  },
  {
    link: 'http://www.soundsair.com/legal/luggage-policy/',
    airline: 'Sounds Air'
  },
  {
    link: 'http://www.flysaa.com/gb/en/policies_and_Disclaimers.action#Luggage',
    airline: 'South African Airways'
  },
  {
    link: 'http://www.flyexpress.aero/travel-information/#cabinbaggage',
    airline: 'South African Express'
  },
  {
    link:
      'https://www.southwest.com/html/customer-service/baggage/index.html?clk=GFOOTER-CUSTOMER-BAGS',
    airline: 'Southwest Airlines'
  },
  {
    link: 'http://www.spicejet.com/AirTravelBaggageFaq.aspx',
    airline: 'SpiceJet'
  },
  {
    link: 'http://www.spirit.com/optionalfees.aspx',
    airline: 'Spirit Airlines'
  },
  {
    link: 'https://www.spirit.com/OptionalServices',
    airline: 'Sprint Air'
  },
  {
    link: 'http://www.srilankan.com/en_uk/plan-and-book/luggage',
    airline: 'SriLankan Airlines'
  },
  {
    link: 'http://www.suncountry.com/page/1/baggage-information.jsp',
    airline: 'Sun Country Airlines'
  },
  {
    link:
      'http://www.sundor.co.il/en/Passenger-Info/Baggage/Pages/Excess-Baggage.aspx',
    airline: "Sun d'Or International Airlines"
  },
  {
    link: 'http://www.sun-air.dk/en/information/baggage/',
    airline: 'Sun-Air'
  },
  {
    link: 'http://www.sunexpress.com/en/luggage/carry-on-luggage',
    airline: 'SunExpress'
  },
  {
    link: 'http://www.qantas.com/travel/airlines/qantaslink/global/en',
    airline: 'Sunstate'
  },
  {
    link:
      'http://www.flysunwing.com/travelinfo/baggageinfo.asp#BaggageAllowance',
    airline: 'Sunwing Airlines'
  },
  {
    link:
      'http://www.slm.nl/en/content/4/travel-information/33/checked-luggage',
    airline: 'Surinam Airways'
  },
  {
    link: 'https://www.swiss.com/de/en/prepare/baggage/checked-baggage.html',
    airline: 'Swiss'
  },
  {
    link: 'http://www.taca.com/eng/syi/bag/bagbagpol.asp?id=14',
    airline: 'TACA'
  },
  {
    link: 'https://www.tailwind.com.tr/travel-information',
    airline: 'Tailwind Airlines'
  },
  {
    link:
      'http://www.tam.com.br/b2c/vgn/v/index.jsp?vgnextoid=45a326d02e2da210VgnVCM1000009508020aRCRD',
    airline: 'TAM Linhas Aéreas'
  },
  {
    link: 'https://www.flytap.com/en-gb/baggage',
    airline: 'TAP'
  },
  {
    link: 'https://www.tarom.ro/en/passenger-information/baggage/',
    airline: 'TAROM'
  },
  {
    link:
      'http://www.thaiairways.com/plan-your-trip/before-you-fly/en/baggage_and_optional_fees.htm',
    airline: 'Thai Airways'
  },
  {
    link: 'https://www.thaismileair.com/en/BaggagePolicy',
    airline: 'Thai Smile'
  },
  {
    link: 'http://www.tigerair.com/sg/en/baggage.php',
    airline: 'Tigerair'
  },
  {
    link: 'http://www.uralairlines.com/en/passengers-info/rules/ruchnaya-klad/',
    airline: 'Tomsk Avia'
  },
  {
    link: 'http://transaero.us/en/info-and-services/baggage/',
    airline: 'Transaero Airlines'
  },
  {
    link: 'https://www.transavia.com/en-UK/my-transavia/hold-luggage/select/',
    airline: 'transavia'
  },
  {
    link: 'https://www.transavia.com/fr-FR/services/bagages-perdus/',
    airline: 'Transavia France'
  },
  {
    link: 'http://www.tuifly.com/en/service/reisegepaeck.html',
    airline: 'TUIfly'
  },
  {
    link:
      'http://www.tunisair.com/site/publish/content/article.asp?ID=108&Lang=en',
    airline: 'Tunisair'
  },
  {
    link:
      'https://p.turkishairlines.com/en-us/any-questions/excess-baggage/index.html',
    airline: 'Turkish Airlines'
  },
  {
    link:
      'http://www.flyuia.com/eng/information-and-services/before-you-fly/baggage/allowances.html',
    airline: 'Ukraine International'
  },
  {
    link: 'http://www.united.com/page/middlepage/0,6823,1031,00.html',
    airline: 'United'
  },
  {
    link:
      'http://www.usairways.com/en-US/traveltools/baggage/baggagepolicies.html',
    airline: 'US Airways'
  },
  {
    link:
      'http://www.utair.ru/en/info/perevozka/transportation.html#transportation',
    airline: 'UTair'
  },
  {
    link:
      'https://www.uzairways.com/en/flights/free-baggage-allowance-class-service',
    airline: 'Uzbekistan Airways'
  },
  {
    link:
      'http://www.vietjetair.com/Sites/Web/en-US/NewsDetail/baggage-service/%20383/baggage-service',
    airline: 'VietJet Air'
  },
  {
    link: 'http://www.vasco.com.vn/Luggage/View/26',
    airline: 'Vietnam Air Service'
  },
  {
    link: 'https://www.vietnamairlines.com/uk/en/travel-information/baggage',
    airline: 'Vietnam Airlines'
  },
  {
    link: 'http://www.virginamerica.com/vx/fees',
    airline: 'Virgin America'
  },
  {
    link:
      'http://www.virgin-atlantic.com/gb/en/travel-information/customer-service/optional-service-fees.html',
    airline: 'Virgin Atlantic'
  },
  {
    link: 'http://www.virginaustralia.com/au/en/plan/baggage/carry-on-baggage/',
    airline: 'Virgin Australia'
  },
  {
    link: 'https://www.vivaaerobus.com/en/info/baggage-rules',
    airline: 'Viva Aerobus'
  },
  {
    link:
      'https://www.vivacolombia.co/en/flying-vivacolombia/before-flying/luggage',
    airline: 'Viva Colombia'
  },
  {
    link: 'https://cms.volaris.com/en/traveling-with-volaris/baggage-policy/',
    airline: 'Volaris'
  },
  {
    link: 'http://www.volotea.com/en/baggage/',
    airline: 'Volotea'
  },
  {
    link:
      'http://www.vueling.com/en/vueling-services/prepare-your-trip/luggage',
    airline: 'Vueling Airlines'
  },
  {
    link: 'http://www.welcomeair.com/en/charter/flotte/dornier_328/',
    airline: 'Welcome Air'
  },
  {
    link:
      'http://www.westjet.com/guest/en/travel/basics/fares/service-fees.shtml',
    airline: 'WestJet'
  },
  {
    link: 'http://www.wideroe.no/en/travel/baggage-essentials',
    airline: 'Wideroe'
  },
  {
    link: 'http://www.windwardexpress.com/baggage.html',
    airline: 'Winair/Windward Islands Airways'
  },
  {
    link: 'http://www.windrose.aero/eng/information_services/rules.html',
    airline: 'Windrose'
  },
  {
    link:
      'https://secure2.lionair.co.id/LionResources/en/Condition_of_Carriage.pdf',
    airline: 'Wings Air'
  },
  {
    link:
      'https://wizzair.com/en-gb/information-and-services/travel-information/baggage',
    airline: 'Wizz Air'
  },
  {
    link:
      'http://www.xiamenair.com/cn/en/traveler/travelpreparation/11320.shtml',
    airline: 'Xiamen Airlines'
  },
  {
    link: 'http://www.xl.com/en/Prepare_your_flight-Baggage_allowance-638',
    airline: 'XL Airways France'
  },
  {
    link: 'http://www.yakutia.aero/en/moscow/information/vsyo-o-bagazhe',
    airline: 'Yakutia Airlines'
  },
  {
    link: 'http://yemenia.com/DisplaySectionDetail.aspx?ID=98',
    airline: 'Yemenia'
  },
  {
    link: 'https://www.yetiairlines.com/article/faqs',
    airline: 'Yeti Airlines'
  }
]
export default airlinefees
