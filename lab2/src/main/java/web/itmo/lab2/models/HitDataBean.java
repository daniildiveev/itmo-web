package web.itmo.lab2.models;


import java.beans.JavaBean;
import java.io.Serializable;

@JavaBean
public class HitDataBean implements Serializable {
    private String x = null;
    private String y = null;
    private String R = null;

    private String hit = null;

    public HitDataBean(){}

    public String getX(){
        return this.x;
    }

    public String getY(){
        return this.y;
    }

    public String getR(){
        return this.R;
    }

    public String getHit(){
        return this.hit;
    }

    public void setX(String x){
        this.x = x;
    }

    public void setY(String y){
        this.y = y;
    }

    public void setR(String R){
        this.R = R;
    }

    public void setHit(String hit){
        this.hit = hit;
    }
}
