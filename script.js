function initMap() {
    const geocoder = new google.maps.Geocoder();
    const address = 'Gary, Indiana, USA';
    
    geocoder.geocode({ address: address }, function(results, status) {
        if (status === 'OK' && results[0]) {
            const location = results[0].geometry.location;
            
            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 12,
                center: location,
                styles: [
                    { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
                    { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#212a37' }] }
                ]
            });
            
            const marker = new google.maps.Marker({
                position: location,
                map: map,
                title: 'Gary, Indiana',
                icon: { url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png', scaledSize: new google.maps.Size(40, 40) }
            });
            
            const infoWindow = new google.maps.InfoWindow({
                content: '<div style="padding: 10px;"><h3>Gary, Indiana</h3><p>We proudly serve this area and surrounding communities.</p></div>'
            });
            
            marker.addListener('click', function() { infoWindow.open(map, marker); });
            infoWindow.open(map, marker);
        }
    });
}

window.initMap = initMap;

document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerHeight = 80;
                const targetPosition = targetSection.offsetTop - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
});