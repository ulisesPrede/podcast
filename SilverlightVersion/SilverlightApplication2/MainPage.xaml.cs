using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;
using System.IO;
using System.Xml;
using System.Collections;
using System.Text;
using System.Windows.Browser;

namespace SilverlightApplication2
{
    public partial class MainPage : UserControl
    {
        private Dictionary<string, string> listaUri;
        private Dictionary<string, string> listaMp3;

        public MainPage()
        {
            InitializeComponent();
            HtmlPage.Document.SetProperty("Podcast Player Silverlight", this.GetType().Name);
            listaUri = new Dictionary<string, string>();
            listaMp3 = new Dictionary<string, string>();
            LeerPodcast("http://youarenotsosmart.libsyn.com/rss");
            LeerPodcast("http://grumpyoldgeeks.libsyn.com/rss");
            LeerPodcast("http://thecyberwire.libsyn.com/rss");
            LeerPodcast("http://learntocodewithme.libsyn.com/rss");
            LeerPodcast("http://radiomotherboard.libsyn.com/rss");
            LeerPodcast("http://rss.acast.com/internetexplorer");
            LeerPodcast("http://eventualmillionaire.libsyn.com/rss");
        }

        private void butAdd_Click(object sender, RoutedEventArgs e)
        {
            LeerPodcast(txtAdd.Text);
        }

        private void butHome_Click(object sender, RoutedEventArgs e)
        {
                Uri url = new Uri("index.html", UriKind.Relative);
                System.Windows.Browser.HtmlPage.Window.Navigate(url);
        }

        protected void LeerPodcast(string uri)
        {
            WebClient wc = new WebClient();
            wc.OpenReadCompleted += new OpenReadCompletedEventHandler(wc_OpenReadCompletedPodcast);
            Uri podcastUri = new Uri(uri, UriKind.Absolute);
            wc.OpenReadAsync(podcastUri);
        }

        protected void LeerItems(string uri)
        {
            WebClient wc = new WebClient();
            wc.OpenReadCompleted += new OpenReadCompletedEventHandler(wc_OpenReadCompletedItems);
            Uri feedUri = new Uri(uri, UriKind.Absolute);
            wc.OpenReadAsync(feedUri);
        }

        protected void LeerMp3(string uri)
        {
            WebClient wc = new WebClient();
            wc.OpenReadCompleted += new OpenReadCompletedEventHandler(wc_OpenReadCompletedMp3);
            Uri mp3Uri = new Uri(uri, UriKind.Absolute);
            wc.OpenReadAsync(mp3Uri);
        }

        protected void DescargaMp3(string url)
        {
            SaveFileDialog dialogo = new SaveFileDialog();
            dialogo.Filter = "All Files|*.*";

            bool? dialogResult = dialogo.ShowDialog();

            if (dialogResult != true) return;

            WebClient webClient = new WebClient();
            webClient.OpenReadCompleted += (s, e) =>
            {
                try
                {
                    using (Stream fs = (Stream)dialogo.OpenFile())
                    {
                        e.Result.CopyTo(fs);
                        fs.Flush();
                        fs.Close();
                    }

                }
                catch (Exception ex)
                {
                    MessageBox.Show("Error al descargar el podcast");
                }
            };
            webClient.OpenReadAsync(new Uri(url), UriKind.Absolute);
        }


        private void wc_OpenReadCompletedPodcast(object sender, OpenReadCompletedEventArgs e)
        {
            if (e.Error != null)
            {
                MessageBox.Show("Intente con un RSS de podcast válido.");
                return;
            }

            using (Stream s = e.Result)
            {
                StringBuilder output = new StringBuilder();
                using (XmlReader reader = XmlReader.Create(s))
                {
                    reader.MoveToContent();
                    reader.ReadToFollowing("atom:link");
                    string link = reader.GetAttribute("href");
                    reader.ReadToFollowing("title");
                    string titulo = reader.ReadInnerXml();
                    listaUri[titulo] = link;
                    listPodcast.Items.Add(titulo);
                }
            }
        }

        private void wc_OpenReadCompletedItems(object sender, OpenReadCompletedEventArgs e)
        {
            if (e.Error != null)
            {
                MessageBox.Show("Error al leer el Podcast");
                return;
            }

            using (Stream s = e.Result)
            {
                StringBuilder output = new StringBuilder();
                using (XmlReader reader = XmlReader.Create(s))
                {
                    reader.MoveToContent();
                    reader.ReadToFollowing("title");
                    visorInfo.Text = reader.ReadInnerXml();
                    reader.ReadToFollowing("itunes:summary");
                    visorInfo.Text += "\n"+reader.ReadInnerXml();

                    listaMp3.Clear();
                    listItems.Items.Clear();

                    while (reader.ReadToFollowing("item"))
                    {
                        reader.ReadToFollowing("title");
                        string titulo = reader.ReadInnerXml();
                        reader.ReadToFollowing("enclosure");
                        string link = reader.GetAttribute("url");
                        listaMp3[titulo] = link;
                        listItems.Items.Add(titulo);
                    }
                }
            }
        }

        private void wc_OpenReadCompletedMp3(object sender, OpenReadCompletedEventArgs e)
        {
            if (e.Error != null)
            {
                MessageBox.Show("Error al leer el archivo media podcast");
                return;
            }

            using (Stream s = e.Result)
            {
                mediaElement.SetSource(s);
            }
        }

        private void listItem_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
                DescargaMp3(listaMp3[listItems.Items[listItems.SelectedIndex].ToString()]);
        }

        private void listPodcast_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            LeerItems(listaUri[listPodcast.Items[listPodcast.SelectedIndex].ToString()]);
        }
        

        private void mediaElement_MediaOpened(object sender, RoutedEventArgs e)
        {

            //mediaElement.Play();
            //MediaElement m = (MediaElement)sender;
            //m.Play();
        }

        /*
public static void PlayMp3FromUrl(string url)
{
   using (Stream ms = new MemoryStream())
   {
       using (Stream stream = WebRequest.Create(url).GetResponse().GetResponseStream())
       {
           byte[] buffer = new byte[32768];
           int read;
           while ((read = stream.Read(buffer, 0, buffer.Length)) > 0)
           {
               ms.Write(buffer, 0, read);
           }
       }

       ms.Position = 0;
       using (WaveStream blockAlignedStream = new BlockAlignReductionStream(
           WaveFormatConversionStream.CreatePcmStream(new Mp3FileReader(ms))))
       {
           using (WaveOut waveOut = new WaveOut(WaveCallbackInfo.FunctionCallback()))
           {
               waveOut.Init(blockAlignedStream);
               waveOut.Play();
               while (waveOut.PlaybackState == PlaybackState.Playing)
               {
                   System.Threading.Thread.Sleep(100);
               }
           }
       }
   }
}*/
    }
}
