import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Swiper from 'react-native-swiper';
import { useEffect } from 'react';
import * as RNLocalize from 'react-native-localize';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import {selectLanguage} from '../redux/langSllice'
import {setLanguage} from '../redux/langSllice'
const leads = [
    {
        "id": 0,
        "type": "Hot",
        "number": 14,
        "img": require('../assests/Images/explosive.png'),
    },
    {
        "id": 1,
        "type": "Warm",
        "number": 24,
        "img": require('../assests/Images/sun.png'),
    },
    {
        "id": 2,
        "type": "Cold",
        "number": 32,
        "img": require('../assests/Images/snowflake.png'),
    },
];

const imgprofile = [
    {
        "img": require('../assests/Images/avatar.png')
    },
    {
        "img": require('../assests/Images/avatar.png')
    },
    {
        "img": require('../assests/Images/avatar.png')
    },
    {
        "img": require('../assests/Images/avatar.png')
    },
    {
        "img": require('../assests/Images/avatar.png')
    }
];

const Home = () => {
    const en = require('../../en.json');

    const [oriText,setOriText] = useState(en);
    // const [lang,setLang] = useState('en');
    const profileData = require('./Profile.json');
    // useEffect(() => {
    //     const locales = RNLocalize.getLocales();
    //     const preferredLanguage = locales[0].languageCode;
    //     setLang(preferredLanguage);
    //     console.log('Preferred Language:', preferredLanguage);
    
    //     translateText();
    //   }, [lang]);
    const lang = useSelector(selectLanguage);
    const dispatch = useDispatch();
  
    useEffect(() => {
        const locales = RNLocalize.getLocales();
        const preferredLanguage = locales[0].languageCode || 'en';
        console.log('Before Language Set:', lang);
        dispatch(setLanguage(preferredLanguage));
        console.log('after Language set:', preferredLanguage);
        translateText();
      }, [dispatch,lang]);

      const translateText = async () => {

        // const encodedParams = new URLSearchParams();
        // encodedParams.set('json_code', '{"text":"thanks for your perce", "author":"Andry RL"}');
        // encodedParams.set('to_lang', 'fr');
        console.log("...................inside fun.........")
        const options = {
          method: 'POST',
          url: 'https://google-translation-unlimited.p.rapidapi.com/translate_json',
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '4ec4bde91cmsh4ff8996210f10bdp131da0jsnbd6f9792eae1',
            'X-RapidAPI-Host': 'google-translation-unlimited.p.rapidapi.com'
          },
          data:{
            json_code:JSON.stringify(en),
            to_lang:lang
          }
        };
        console.log("............",options)
        
        try {
          const response = await axios.request(options);
          console.log(response.data);
          setOriText(response.data.json_traduit)
        } catch (error) {
          console.error(error);
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.topnamecontainer}>
                <View style={styles.namecontainer}>
                    <Text style={styles.name}>{oriText.topName}</Text>
                    <Text style={styles.village}>{oriText.address}</Text>
                </View>
                <Image source={require('../assests/Images/notification.png')} style={styles.notificationimg} />
            </View>

            {/* ...............slider component............. */}

            <Swiper style={styles.wrapper} showsButtons={false}>
                {/* Slide 1 */}
                <View style={styles.slide}>
                    <View style={styles.insideslide}>
                        <View style={styles.slideContent}>
                            <View>
                                <Text style={styles.title}>{oriText.target}</Text>
                                <Text style={[styles.title, { opacity: 0.5 }]}>{oriText.Leads}</Text>
                            </View>
                            <Text style={styles.subtitle}>{oriText.date}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={require('../assests/Images/notification.png')} style={styles.linegraphimg} />
                            <Image source={require('../assests/Images/notification.png')} style={styles.circleimg} />
                        </View>

                        <View style={styles.slideContentInfo}>
                            <View style={styles.slideContentOne}>
                                <Image
                                    source={require('../assests/Images/LineStroke.png')}
                                    style={styles.lineimg}
                                />
                                <Text style={styles.percent}>{oriText.percent}</Text>
                            </View>
                            <View style={styles.slideContentTwo}>
                                <Text style={styles.infoText}>{oriText.vechicles}</Text>
                                <Image
                                    source={require('../assests/Images/info-circle.png')}
                                    style={styles.infoimg}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                {/* Slide 2 */}
                <View style={styles.slide}>
                    <View style={styles.insideslide}>
                        <View style={styles.slideContent}>
                            <View>
                                <Text style={styles.title}>{oriText.target}</Text>
                                <Text style={[styles.title, { opacity: 0.5 }]}>{oriText.Leads}</Text>
                            </View>
                            <Text style={styles.subtitle}>{oriText.date}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={require('../assests/Images/linegraph.png')} style={styles.linegraphimg} />
                            <Image source={require('../assests/Images/spotcircle.png')} style={styles.circleimg} />
                        </View>


                        <View style={styles.slideContentInfo}>
                            <View style={styles.slideContentOne}>
                                <Image
                                    source={require('../assests/Images/LineStroke.png')}
                                    style={styles.lineimg}
                                />
                                <Text style={styles.percent}>{oriText.percent}</Text>
                            </View>
                            <View style={styles.slideContentTwo}>
                                <Text style={styles.infoText}>{oriText.vechicles}</Text>
                                <Image
                                    source={require('../assests/Images/info-circle.png')}
                                    style={styles.infoimg}
                                />
                            </View>
                        </View>
                    </View>
                </View>

                {/* slide 3 */}

                <View style={styles.slide}>
                    <View style={styles.insideslide}>
                        <View style={styles.slideContent}>
                            <View>
                                <Text style={styles.title}>{oriText.target}</Text>
                                <Text style={[styles.title, { opacity: 0.5 }]}>{oriText.Leads}</Text>
                            </View>
                            <Text style={styles.subtitle}>{oriText.date}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={require('../assests/Images/linegraph.png')} style={styles.linegraphimg} />
                            <Image source={require('../assests/Images/spotcircle.png')} style={styles.circleimg} />
                        </View>


                        <View style={styles.slideContentInfo}>
                            <View style={styles.slideContentOne}>
                                <Image
                                    source={require('../assests/Images/LineStroke.png')}
                                    style={styles.lineimg}
                                />
                                <Text style={styles.percent}>{oriText.percent}</Text>
                            </View>
                            <View style={styles.slideContentTwo}>
                                <Text style={styles.infoText}>{oriText.vec}</Text>
                                <Image
                                    source={require('../assests/Images/info-circle.png')}
                                    style={styles.infoimg}
                                />
                            </View>
                        </View>
                    </View>
                </View>

            </Swiper>

            {/* .........................Lead Container................ */}
            <View style={{ paddingBottom: 20 }}>
                <View style={styles.leadcontainer}>
                    <Text style={styles.heading}>{oriText.lead}</Text>
                    <View style={styles.leadtypes}>

                        {
                            leads.map((item, index) => (
                                <View style={{ paddingHorizontal: 20 }}>
                                    <View style={[styles.leadimgContainer, index == leads.length - 2 && { marginRight: 20, top: -35, left: 25 }]}>
                                        <Image source={item.img} style={styles.getImageByType(item.type)} />
                                        <View style={styles.leadbox}></View>
                                        <Text style={styles.leadnum}>{item.number}</Text>
                                    </View>
                                    <Text style={[styles.leadtext, , index == leads.length - 2 && { marginRight: 20, top: -125, left: 22 }]}>{item.type}</Text>
                                </View>
                            ))
                        }
                    </View>
                </View>
            </View>

            {/*........................... Profile Follow Ups component..................... */}
            <View style={styles.followcontainer}>
                <View style={styles.followUpsContainer}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>{oriText.today}<Text style={styles.numbertext}>(10)</Text></Text>
                        <Text style={styles.showAllText}>{oriText.showAll}</Text>
                    </View>
                    <View style={styles.profileList}>
                        {profileData.map((item, index) => (
                            <View style={styles.profileItem} key={item.id}>


                                <View style={styles.imagecontainer}>
                                    {imgprofile.map((ele, key) => (index == key) ? (
                                        <Image source={ele.img} style={styles.avatar} />
                                    ) : null)
                                    }
                                    <Image source={require('../assests/Images/star.png')} style={styles.star} />
                                </View>



                                <View style={styles.profileDetails}>
                                    <Text style={styles.nameText}>{oriText.name}</Text>
                                    <Text style={styles.followUpsText}>{oriText.followUps}</Text>
                                </View>
                                <Text style={styles.timeText}>{item.time}</Text>
                            </View>
                        ))}
                    </View>
                </View>

            </View>

        </ScrollView>
    )

}

export default Home

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 18,
        paddingTop: 15,

    },
    topnamecontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        marginBottom: 10,
        marginTop: 10,
    },
    namecontainer: {

    },
    name: {
        fontSize: 20,
        fontFamily: 'Inter',
        fontWeight: '600',
        fontStyle: 'normal',
        color: 'black'
    },

    notificationimg: {
        width: 24,
        height: 24,
        marginTop: 8
    },
    leadcontainer: {
        //paddingHorizontal: 10,
        elevation: 2,
        //borderWidth:1,
        borderRadius: 10,
        backgroundColor: '#fff',
        //padding: 10,
        top: 10,
        margin: 3,

    },
    heading: {
        fontSize: 18,
        fontFamily: 'Inter',
        fontWeight: '800',
        color: '#111827',
        marginTop: 10,
        left: 10
    },
    leadtypes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40,
        width: 335,
        height: 120,

    },
    leadItemContainer: {
        alignItems: 'center',
        left: 0
    },
    leadimgContainer: {
        position: 'relative',
    },
    leadimg: {
        width: 43,
        height: 43,
        zIndex: 2,
        top: -30,
        left: -7,
        borderRadius: 12,
    },

    getImageByType: (type) => {
        switch (type) {
            case "Hot":
                return {
                    width: 43,
                    height: 43,
                    zIndex: 2,
                    top: -15,
                    left: -7,
                    borderRadius: 10,
                };
            case "Warm":
                return {
                    width: 79,
                    height: 79,
                    zIndex: 2,
                    left: -27,
                    borderRadius: 10,
                };
            case "Cold":
                return {
                    width: 46,
                    height: 46,
                    zIndex: 2,
                    top: -15,
                    left: -7,
                    borderRadius: 10,
                };
            default:
                return {};
        }
    },
    leadbox: {
        zIndex: 1,
        width: 70,
        height: 70,
        backgroundColor: '#F3F4F6',
        marginBottom: 5,
        position: 'absolute',
        borderRadius: 20,
        bottom: 0,
        left: 0,
    },
    leadnum: {
        zIndex: 2,
        position: 'relative',
        top: -18,
        left: 30,
        fontSize: 20,
        fontWeight: '700',
        color: '#111827'
    },
    leadtext: {
        position: 'relative',
        top: -90,
        paddingTop: 90,
        textTransform: 'uppercase',
        paddingLeft: 19,
    },
    followcontainer: {
        //flex: 1,
        backgroundColor: '#fff',
        //marginHorizontal: 16,
        // paddingTop: 20,
        // borderWidth:1,
        //borderRadius: 12,
        top: 10,
        margin: 3,
        // borderColor:'#E5E7EB',
        marginBottom: 40,

    },

    followUpsContainer: {
        //marginBottom: 20,
        // paddingHorizontal: 20,
        elevation: 2,
        borderRadius: 12,
        backgroundColor: '#fff',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        // marginTop: 10,
        //paddingBottom:20
        //paddingTop:15,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginBottom: 10,
        textAlign: 'center',
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: '#E5E7EB',
        backgroundColor: '#fff',
        padding: 15,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,


    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        fontFamily: 'Inter'
    },
    numbertext: {
        fontSize: 18,
        fontWeight: '600',
        color: '#00A0FF',
        fontFamily: 'Inter'
    },
    showAllText: {
        color: '#00A0FF',
        fontSize: 14,
        fontFamily: 'Inter',
        fontWeight: '600'
    },
    profileList: {
        backgroundColor: '#fff',
        //borderRadius: 10,
        //padding: 10,

    },
    profileItem: {
        flexDirection: 'row',
        alignItems: 'center',
        //marginBottom: 10,
        //elevation: 1,
        borderTopWidth: 1,

        borderColor: '#E5E7EB',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        backgroundColor: '#fff',

    },
    avatar: {
        width: 32,
        height: 36,
        // borderRadius: 25,
        marginRight: 10,
    },
    profileDetails: {
        flex: 1,
        padding: 10
    },
    nameText: {
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'Inter',
        color: '#111827',
        lineHeight: 20,
    },
    followUpsText: {
        color: '#9CA3AF',
        fontSize: 12,
        fontFamily: 'Inter',
        fontWeight: '400'
    },
    timeText: {
        color: '#9CA3AF',
        fontSize: 12,
        fontFamily: 'Inter',
        fontWeight: '400',
        top: 9
    },
    imagecontainer: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    star: {
        width: 21,
        height: 8,
        marginLeft: 5,
        top: -4.5,
    },
    wrapper: {
        height: 250,
        marginBottom: 10,
    },
    slide: {
        //flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#00A0FF',
        borderRadius: 12,
        marginLeft: 15

    },
    insideslide: {
        marginHorizontal: 15,
        marginVertical: 15,
    },
    slideContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        alignItems: 'center',
    },
    slideContentInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        bottom: 0,
        top: 20,
    },
    slideContentOne: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: 55,
        height: 25,
        borderRadius: 5,
        paddingHorizontal: 5,
        //paddingVertical:2,
        //right:50,
        marginBottom: 20,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    slideContentTwo: {
        flexDirection: 'row',
        // justifyContent:'space-between',
        marginBottom: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Inter',
        color: '#fff',
    },
    subtitle: {
        fontSize: 14,
        color: '#fff',
        fontFamily: 'Inter',
        fontWeight: '400',
        top: -10,

    },
    lineimg: {
        width: 180, // Adjust the width as needed
        height: 15, // Adjust the height as needed
        resizeMode: 'contain',
        tintColor: '#52B54F'
    },
    percent: {
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'Inter',
        marginTop: 10,
        right: 80,
        top: -7,
        color: '#52B54F'
    },
    infoText: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Inter',
        color: '#fff'
    },
    infoimg: {
        width: 16,
        height: 16,
        top: -3,
        resizeMode: 'contain',
        marginTop: 10,
        tintColor: '#FFFFFF'
    },
    linegraphimg: {
        tintColor: 'white',
        transform: [{ rotate: '-15deg' }],
        width: 200,
        height: 80,
        left: -22,
    },
    circleimg: {
        tintColor: 'white',
        width: 15,
        height: 15,
        left: -43.5,
        top: -10,

    }
})