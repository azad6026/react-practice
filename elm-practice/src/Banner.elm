viewBanner : Banner -> Html msg
viewBanner banner =
    div
        [ class "relative overflow-hidden banner-item"
        , style "min-height" "300px"
        ]
        [ img
            [ src banner.imageUrl
            , class "w-full h-full object-cover"
            , alt banner.altText
            ]
            []
        , div
            [ class "text-overlay"
            ]
            [ h2
                [ class "text-3xl-serif mb-2" ]
                [ text banner.title ]
            , p
                [ class "text-lg-sans-bold-stretched" ]
                [ text banner.subtitle ]
            ]
        ] 