
$(document).ready(function() {
    $("#img").change(function() {
  var file = this.files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    $("#preview").html("<img src='" + e.target.result + "' width='320' height='240'>");
  };
  reader.readAsDataURL(file);
});

  $("#search-btn").click(function() {
    $("#loading").show();
    var file = $("#img")[0].files[0];
    var formData = new FormData();
    formData.append("image", file);
    $.ajax({
      type: "POST",
      url: "https://api.trace.moe/search",
      data: formData,
      contentType: false,
      processData: false,
      cache: false,
      dataType: "json",
      success: function(data) {
        $("#loading").hide();
        var hasil = "";
        $.each(data.result, function(index, value) {
          hasil += `
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-one-two">
                        <div class="field">
                          <div class="content">
                                <div class="card has-background-dark has-text-light">
                                    <div class="card-content"><div class="content">
  
                                    <div class="field">
                                    <h5>Name: ${value.filename}</h5>
                                    <h5>Episode: ${value.episode}</h5>
                                    <p>Anilist ID: ${value.anilist}</p>
                                    <p>Similarity: ${value.similarity}</p>
                                    <video width="320" height="240" controls><source src="${value.video}" type="video/mp4"></video>
                                    </div>
                                    
                                </div>
                            </div>
                    </div>
            </div>
        </div>
          `;
        });
        $("#result").html(hasil);
      }
    });
  });
});