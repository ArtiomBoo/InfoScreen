# InfoScreen Project

This is a quick project inspired by an unused screen at work. Occasionally, our team lead shared fun facts at the end of standups, or someone from the team contributed if they had one.

In my free time, I decided to create a simple website with several view pages:

- **Main Page:** Displays our team name, which changes to an eating-related image during lunch.
- **News Pages:** Fetch articles from NRK, VG, and Kode24.
- **Fun Fact Pages:** ChatGPT generates fun facts, and DALL·E 3 creates images based on them.
- **Image Generator:** Users can generate images from a custom prompt.
- **Developer Fun Facts:** ChatGPT generates fun facts specifically about developers.

To reduce API calls to ChatGPT and DALL·E 3, both images and facts are stored in the browser cache.

This project is built with **Angular** and packaged in a **Docker container** for easier deployment and use.

## Technologies Used

- Angular – Frontend framework
- Docker – Containerization
- Azure OpenAI ChatGPT API – Fun fact generation
- Azure OpenAI DALL·E 3 API – Image generation
- NRK API – News articles
- VG API – News articles
- Kode24 API – News articles

---

## 🚀 Running the Project

### Using Docker:
Run the following command to start the project in a Docker container:

```sh
docker run -e TITLE="Team name" \
           -e DALLE_URL="azure openai dalle url" \
           -e DALLE_API_KEY="xxxxx" \
           -e CHATGPT_URL="azure openai chatgpt url" \
           -e CHATGPT_API_KEY="xxxxx" \
           -p 4100:80 aestum/infoscreen:1.0.0
```

## ⚡ Using Angular:
Alternatively, you can run the project locally using Angular.
In this case, some adjustments may be needed to correctly read the environment variables.
`ng build`
`ng serve`

## 📌 Available Pages
🏠 Main Page

    localhost:4100

![InfoScreen Preview](http://artiom.no/images/infoscreen/main.png)

📰 News Pages

    localhost:4100/kode24
    localhost:4100/vg
    localhost:4100/nrk

![InfoScreen Preview](http://artiom.no/images/infoscreen/kode24.png)

🎭 Fun Fact Pages

    General Fun Fact: localhost:4100/funfact
    Developer Fun Fact: localhost:4100/devfunfact

![InfoScreen Preview](http://artiom.no/images/infoscreen/funfact.png)
![InfoScreen Preview](http://artiom.no/images/infoscreen/devfunfact.png)


🎨 Image Generator

    Generate an image: localhost:4100/dalle?prompt=Cyberpunk%20Norway
    Generate an image without using cache: localhost:4100/dalle?prompt=Cyberpunk%20Norway&cache=false
![InfoScreen Preview](http://artiom.no/images/infoscreen/dalle.png)
