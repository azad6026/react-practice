module Banner exposing (main)

import Browser
import Html exposing (Html, a, div, figure, figcaption, h3, img, span, text)
import Html.Attributes exposing (alt, attribute, class, href, id, src)
import Http
import Json.Decode as Decode exposing (Decoder, field, string)


-- MAIN


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }



-- MODEL


type Model
    = Loading
    | Success BannerData
    | Failure Http.Error


type alias BannerData =
    { banners : List Banner
    }


type alias Banner =
    { id : String
    , href : String
    , imageUrl : String
    , imageSizes : String
    , srcset : String
    , title : String
    , linkText : String
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( Loading, getBanners )



-- UPDATE


type Msg
    = GotBanners (Result Http.Error BannerData)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotBanners result ->
            case result of
                Ok bannerData ->
                    ( Success bannerData, Cmd.none )

                Err error ->
                    ( Failure error, Cmd.none )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none



-- VIEW


view : Model -> Html Msg
view model =
    case model of
        Loading ->
            div [ class "loading" ] [ text "Loading banners..." ]

        Success data ->
            viewBanners data

        Failure _ ->
            div [ class "error" ] [ text "Failed to load banners. Please try again later." ]


viewBanners : BannerData -> Html Msg
viewBanners data =
    div [ class "relative peak-season-subbanner-wrapper" ]
        [ div [ class "grid-container" ]
            (List.map viewBanner data.banners)
        ]


viewBanner : Banner -> Html Msg
viewBanner banner =
    a [ class "banner-item no-underline block relative", href banner.href, id banner.id ]
        [ figure [ class "overflow-hidden m-0" ]
            [ div [ class "relative" ]
                [ img
                    [ class "h-[61vw] block w-full object-cover md:h-[30vw]"
                    , alt banner.title
                    , attribute "loading" "lazy"
                    , attribute "sizes" banner.imageSizes
                    , src (banner.imageUrl ++ "?auto=format&fit=max&w=400")
                    , attribute "srcset" banner.srcset
                    ]
                    []
                , figcaption [ class "figcaption-styles" ]
                    [ div [ class " text-grey" ]
                        [ h3 [ class "text-2xl-serif md:text-3xl-serif xl:text-4xl-serif mb-2" ]
                            [ text banner.title ]
                        , span [ class "text-base-sans-bold-stretched xl:text-lg-sans-bold-stretched" ]
                            [ text banner.linkText ]
                        ]
                    ]
                ]
            ]
        ]



-- HTTP


getBanners : Cmd Msg
getBanners =
    Http.get
        { url = "/banners.json"
        , expect = Http.expectJson GotBanners bannerDataDecoder
        }



-- DECODERS


bannerDataDecoder : Decoder BannerData
bannerDataDecoder =
    Decode.map BannerData
        (field "banners" (Decode.list bannerDecoder))


bannerDecoder : Decoder Banner
bannerDecoder =
    Decode.map7 Banner
        (field "id" string)
        (field "href" string)
        (field "imageUrl" string)
        (field "imageSizes" string)
        (field "srcset" string)
        (field "title" string)
        (field "linkText" string)